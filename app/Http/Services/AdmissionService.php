<?php

namespace App\Http\Services;

use App\Models\Shift;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Exceptions\AdmissionProcessingException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdmissionService
{
    /**
     * Store a new admission form.
     *
     * @param  array  $data  The form data
     * @param  Request  $request  The HTTP request containing files
     * @return AdmissionForm
     *
     * @throws AdmissionProcessingException
     */
    public function store(array $data, Request $request)
    {
        $logContext = ['request_id' => uniqid(), 'data' => $this->sanitizeLogData($data)];
        Log::channel('admission_form')->info('Processing admission form', $logContext);

        // Array to store file paths for cleanup
        $filePaths = [];

        try {
            DB::beginTransaction();

            // Process form data
            $data = $this->processFormData($data, $request, $logContext, $filePaths);

            // Create admission form
            $admissionForm = AdmissionForm::create($data);

            // Process examination data
            $this->processExaminationData($admissionForm, $data['original_examination_data'] ?? [], $logContext);

            DB::commit();

            Log::channel('admission_form')->info('Admission form stored successfully', $logContext + ['form_id' => $admissionForm->id]);

            return $admissionForm;
        } catch (ModelNotFoundException $e) {
            DB::rollBack();

            // Clean up stored files
            $this->cleanupStorage($filePaths);

            Log::channel('admission_form')->error('Model not found', $logContext + ['exception' => $this->formatException($e)]);
            throw new AdmissionProcessingException('Invalid selection: Resource not found', 422, $e);
        } catch (\Exception $e) {
            DB::rollBack();

            // Clean up stored files
            $this->cleanupStorage($filePaths);

            Log::channel('admission_form')->error('Failed to store admission form', $logContext + ['exception' => $this->formatException($e)]);
            throw new AdmissionProcessingException('Failed to process admission form: '.$e->getMessage(), 400, $e);
        }
    }

    /**
     * Process the main form data.
     *
     * @throws \Exception
     */
    protected function processFormData(array $data, Request $request, array &$logContext, array &$filePaths): array
    {
        // Store original examination data for later processing
        $data['original_examination_data'] = $data['examination'] ?? [];
        unset($data['examination']);

        // Process photo
        $data = $this->processPhoto($data, $request, $filePaths);

        // Process program and subject combination
        $data = $this->processProgramData($data);

        // Process shift
        $data = $this->processShiftData($data);

        // Process documents
        $data = $this->processDocuments($data, $request, $filePaths);

        $logContext['processed_data'] = $this->sanitizeLogData($data);

        return $data;
    }

    /**
     * Process and validate the photo upload.
     *
     * @throws \Exception
     */
    protected function processPhoto(array $data, Request $request, array &$filePaths): array
    {
        if (! $request->hasFile('photo')) {
            throw new \Exception('Photo is required');
        }

        $photo = $request->file('photo');

        if (! $photo->isValid()) {
            throw new \Exception('Invalid photo upload');
        }

        // Additional validation could go here (size, dimensions, etc.)
        if ($photo->getSize() > 2 * 1024 * 1024) { // 2MB limit
            throw new \Exception('Photo exceeds maximum size limit (2MB)');
        }

        $path = $photo->store('photos', 'public');

        if (! $path) {
            throw new \Exception('Failed to store photo');
        }

        $data['photo_path'] = $path;
        $filePaths[]        = $path;

        return $data;
    }

    /**
     * Process program-related data.
     *
     * @throws ModelNotFoundException
     * @throws \Exception
     */
    protected function processProgramData(array $data): array
    {
        if (empty($data['program_id'])) {
            throw new \Exception('Program is required');
        }

        $programGroups = app(ProgramGroupService::class)->getProgramGroups();

        $programGroup = collect($programGroups)->first(
            fn ($group) => collect($group['programs'])->contains(fn ($program) => $program['id'] == $data['program_id'])
        );

        $selectedProgram = $programGroup
            ? collect($programGroup['programs'])->first(fn ($program) => $program['id'] == $data['program_id'])
            : null;

        if (! $selectedProgram) {
            throw new \Exception('Invalid program selected');
        }

        // Handle subject combination if provided
        if (! empty($data['subject_combination'])) {
            if (empty($selectedProgram['subject_combinations'])) {
                throw new \Exception('No subject combinations available for this program');
            }

            $selectedCombination = collect($selectedProgram['subject_combinations'])
                ->firstWhere('id', $data['subject_combination']);

            if (! $selectedCombination) {
                throw new \Exception('Invalid subject combination selected');
            }

            $data['subject_combination']    = $selectedCombination['subjects'];
            // $data['subject_combination_id'] = $selectedCombination->id; // Keep reference to combination ID
        }

        // Store required exam results for validation
        $data['required_exams'] = array_column($selectedProgram['examination_results'], 'title');
        $data['required_docs']  = $selectedProgram['document_requirements'] ?? [];

        return $data;
    }

    /**
     * Process shift data.
     *
     * @throws ModelNotFoundException
     */
    protected function processShiftData(array $data): array
    {
        if (empty($data['shift'])) {
            throw new \Exception('Shift is required');
        }

        $shift = Shift::findOrFail($data['shift']);

        $data['shift']    = $shift->name;
        // $data['shift_id'] = $shift->id; // Keep reference to shift ID

        return $data;
    }

    /**
     * Process document uploads.
     */
    protected function processDocuments(array $data, Request $request, array &$filePaths): array
    {
        $storedDocuments    = [];
        $documentsInput     = $request->input('documents', []);
        $required_documents = $data['required_docs'];

        if (empty($required_documents)) {
            return $data;
        }

        foreach ($required_documents as $required_document) {
            if (isset($required_document['is_required']) && ! $required_document['is_required']) {
                continue;
            }

            $providedDocNames = array_column($documentsInput, 'name');
            $requiredDocName  = $required_document['document']['name'] ?? '';

            if (isset($requiredDocName) && ! in_array($requiredDocName, $providedDocNames)) {
                throw new \Exception("Document '{$requiredDocName}' is required");
            }
        }

        foreach ($documentsInput as $index => $document) {
            $documentName   = $document['name'];
            $documentReq    = collect($required_documents)->first(fn ($doc) => data_get($doc, 'document.name') === $documentName);

            if (! $documentReq) {
                throw new \Exception('Invalid document.');
            }

            $isRequired = (bool) $documentReq['is_required'];

            if ($request->hasFile("documents.$index.value")) {
                $file = $request->file("documents.$index.value");

                if ($file->isValid()) {
                    // Additional validation could go here (size, type, etc.)
                    if ($file->getSize() > 5 * 1024 * 1024) { // 5MB limit
                        throw new \Exception("Document '{$file->getClientOriginalName()}' exceeds size limit (10MB)");
                    }

                    $allowedMimeTypes = ['application/pdf'];

                    if (! in_array($file->getMimeType(), $allowedMimeTypes)) {
                        throw new \Exception("Invalid file type for '{$file->getClientOriginalName()}'. Only PDFs are allowed.");
                    }

                    $filename       = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
                    $path           = $file->storeAs('documents', $filename, 'private');
                    $filePaths[]    = $path;

                    $storedDocuments[] = [
                        'name'          => $document['name'] ?? $file->getClientOriginalName(),
                        'original_name' => $file->getClientOriginalName(),
                        'mime_type'     => $file->getMimeType(),
                        'size'          => $file->getSize(),
                        'path'          => $path,
                    ];
                } else {
                    throw new \Exception('Invalid document upload for '.$document['name'].'.');
                }
            } else {
                if ($isRequired) {
                    throw new \Exception("Document '{$documentName}' is required");
                }
            }
        }

        $data['documents'] = $storedDocuments;

        return $data;
    }

    /**
     * Process and store examination data.
     *
     * @throws \Exception
     */
    protected function processExaminationData(AdmissionForm $admissionForm, array $examinationData, array &$logContext): void
    {
        if (! is_array($examinationData)) {
            throw new \Exception('Examination data must be an array');
        }

        $logContext['examination_data'] = $examinationData;

        // Validate that all required examinations are present
        $requiredExams = $admissionForm->required_exams ?? [];
        $providedExams = array_column($examinationData, 'name');

        $missingExams = array_diff($requiredExams, $providedExams);

        if (! empty($missingExams) && ! empty($requiredExams)) {
            throw new \Exception('Missing required examination results: '.implode(', ', $missingExams));
        }

        // Create examination records
        foreach ($examinationData as $details) {
            // Validate required exam fields
            $requiredFields = ['name', 'year', 'roll_no', 'total_marks', 'obtained_marks'];

            foreach ($requiredFields as $field) {
                if (empty($details[$field])) {
                    throw new \Exception("Field '{$field}' is required for examination '{$details['name']}'");
                }
            }

            // Validate obtained marks don't exceed total marks
            if ((float) $details['obtained_marks'] > (float) $details['total_marks']) {
                throw new \Exception("Obtained marks cannot exceed total marks for '{$details['name']}'");
            }

            $admissionForm->examinations()->create([
                'name'             => $details['name'],
                'year'             => $details['year'],
                'roll_no'          => $details['roll_no'],
                'total_marks'      => $details['total_marks'],
                'obtained_marks'   => $details['obtained_marks'],
                'subjects'         => $details['subjects']         ?? null,
                'board_university' => $details['board_university'] ?? null,
                'school_college'   => $details['school_college']   ?? null,
            ]);
        }
    }

    /**
     * Generate success URL for redirect after form submission.
     */
    public function generateSuccessUrl(AdmissionForm $admissionForm): string
    {
        // Use JSON Web Token or similar approach for better security
        $encodedData = $this->encodeFormData(['form_no' => $admissionForm->form_no]);

        return route('admission-form.success', ['form_data' => $encodedData]);
    }

    /**
     * Encode form data for URL.
     */
    protected function encodeFormData(array $data): string
    {
        // Add a timestamp for TTL verification
        $data['timestamp'] = time();

        // In production, should use a more secure method like JWT with proper signing
        return base64_encode(json_encode($data));
    }

    /**
     * Get admission form from encoded data.
     */
    public function getAdmissionFormForData(string $form_data): ?AdmissionForm
    {
        try {
            $decoded = json_decode(base64_decode($form_data), true);

            if (! isset($decoded['form_no'])) {
                return null;
            }

            // Verify timestamp is not too old (e.g., link valid for 24 hours)
            if (isset($decoded['timestamp']) && time() - $decoded['timestamp'] > 86400) {
                Log::channel('admission_form')->warning('Expired form data link accessed', ['form_data' => $form_data]);

                return null;
            }

            return AdmissionForm::with(['examinations' => fn($q) => $q->orderBy('id', 'ASC')])->where('form_no', $decoded['form_no'])->first();
        } catch (\Exception $e) {
            Log::channel('admission_form')->warning('Failed to decode form data', [
                'form_data' => $form_data,
                'exception' => $this->formatException($e),
            ]);

            return null;
        }
    }

    /**
     * Format exception for logging.
     */
    protected function formatException(\Exception $e): array
    {
        return [
            'message' => $e->getMessage(),
            'code'    => $e->getCode(),
            'file'    => $e->getFile(),
            'line'    => $e->getLine(),
            'trace'   => array_slice($e->getTrace(), 0, 5), // Limit trace depth for log size
        ];
    }

    /**
     * Sanitize data for logging to remove sensitive information.
     */
    protected function sanitizeLogData(array $data): array
    {
        $sensitiveFields = ['password', 'cnic', 'photo', 'documents'];

        $sanitized = $data;

        foreach ($sensitiveFields as $field) {
            if (isset($sanitized[$field])) {
                $sanitized[$field] = '[REDACTED]';
            }
        }

        return $sanitized;
    }

    /**
     * Clean up storage for a failed admission.
     *
     * @param  array  $paths  Array of file paths to delete
     */
    public function cleanupStorage(array $paths): void
    {
        foreach ($paths as $path) {
            if (Storage::disk('private')->exists($path)) {
                Storage::disk('private')->delete($path);
                Log::channel('admission_form')->info('Cleaned up file', ['path' => $path]);
            }
        }
    }
}
