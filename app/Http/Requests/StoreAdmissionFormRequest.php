<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use App\Models\Shift;
use App\Models\AdmissionForm;
use Illuminate\Validation\Rule;
use App\Http\Services\ProgramGroupService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreAdmissionFormRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $programGroups    = app(ProgramGroupService::class)->getProgramGroups();
        $programs         = $programGroups->flatMap(fn ($group) => $group['programs'])->values();
        $programId        = $this->input('program_id');
        $examinationRules = [];
        $selectedProgram  = null;

        if ($programId) {
            // Find the program group and specific program to get required examination results
            $selectedProgram = collect($programs)->firstWhere('id', $programId);
            $requiredResults = $selectedProgram['examination_results'] ?? [];

            // Examination validation rules
            $examinationRules = [
                'examination'        => 'required|array|min:'.count($requiredResults).',max:'.count($requiredResults),
                'examination.*.name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::in(array_column($requiredResults, 'title')),
                ],
                'examination.*.year'           => 'required|numeric|digits:4|between:1900,'.date('Y'),
                'examination.*.roll_no'        => 'required|string|max:15',
                'examination.*.total_marks'    => 'required|numeric',
                'examination.*.obtained_marks' => [
                    'required',
                    'numeric',
                    function ($attribute, $value, $fail) {
                        // Get the index from the attribute name (e.g., examination.0.obtained_marks)
                        preg_match('/examination\.(\d+)\.obtained_marks/', $attribute, $matches);
                        $index = $matches[1] ?? null;

                        if ($index !== null) {
                            $totalMarks = $this->input("examination.{$index}.total_marks", 0);

                            if ($value < 0 || $value > $totalMarks) {
                                $examName = $this->input("examination.{$index}.name", 'examination');
                                $fail("The obtained marks for {$examName} must be between 0 and {$totalMarks}.");
                            }
                        }
                    },
                ],
                'examination.*.subjects'         => 'required|string|max:255',
                'examination.*.board_university' => 'required|string|max:255',
                'examination.*.school_college'   => 'required|string|max:255',
            ];

            $documentRequirements = $selectedProgram['document_requirements'] ?? [];
            $documentsRules       = [];

            if (count($documentRequirements) > 0) {
                $requiredDocuments = collect($documentRequirements)
                    ->filter(fn ($requirement) => $requirement['is_required'])
                    ->pluck('document.name')
                    ->toArray();

                $documentsRules = [
                    'documents' => [
                        'bail',
                        'required',
                        'array',
                        function ($attribute, $value, $fail) use ($requiredDocuments) {
                            // Extract provided document names
                            $providedDocumentNames = array_column($value, 'name');

                            // Find missing required documents
                            $missingDocuments = array_diff($requiredDocuments, $providedDocumentNames);

                            if (! empty($missingDocuments)) {
                                $fail('Missing required documents: '.implode(', ', $missingDocuments));
                            }
                        },
                    ],
                    'documents.*.name' => [
                        'required',
                        'string',
                    ],
                    'documents.*.value' => [
                        'required',
                        'file',
                        'mimes:pdf',
                        'max:5120', // 5MB
                        function ($attribute, $value, $fail) use ($requiredDocuments) {
                            // Extract the document index from the attribute (documents.{index}.value)
                            preg_match('/documents\.(\d+)\.value/', $attribute, $matches);
                            $index = $matches[1] ?? null;

                            // Ensure the name exists before checking
                            if ($index !== null && request()->input("documents.$index.name")) {
                                $documentName = request()->input("documents.$index.name");

                                // If the document is required, its value must be provided
                                if (in_array($documentName, $requiredDocuments) && ! $value) {
                                    $fail("The document '$documentName' is required and must have a file.");
                                }
                            }
                        },
                    ],
                ];
            }
        }

        return array_merge([
            'shift' => [
                'bail',
                'required',
                Rule::exists('shifts', 'id')->where(function ($query) {
                    return $query->where('status', Shift::ACTIVE);
                }),
            ],
            'program_id' => [
                'bail',
                'required',
                'string',
                'max:255',
                Rule::in($programs->pluck('id')->toArray()),
            ],
            'subject_combination' => 'nullable|exists:subject_combinations,id',
            'name'                => 'required|string|max:255',
            'cell'                => 'required|string|min:10|max:20',
            'father_name'         => 'required|string|max:255',
            'father_cell'         => 'required|string|min:10|max:20',
            'cnic'                => [
                'required',
                'string',
                'regex:/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/',
                Rule::unique('admission_forms')->where(function ($query) use ($selectedProgram) {
                    return $query
                        ->where('cnic', $this->input('cnic'))
                        ->where('shift', $this->input('shift'))
                        ->when($selectedProgram, fn ($query, $program) => $query->where('program_id', $program['id']))
                        ->where('subject_combination', $this->input('subject_combination'))
                        ->whereIn('status', [AdmissionForm::APPROVED, AdmissionForm::PENDING]);
                }),
            ],
            'domicile'            => 'required|string|max:255',
            'religion'            => 'required|string|max:255',
            'dob'                 => 'required|date|before:today|date_format:Y-m-d', // Changed to accept yyyy-mm-dd format
            'email'               => 'required|email:rfc,dns|max:255',
            'father_occupation'   => 'required|string|max:255',
            'father_cnic'         => 'required|string|regex:/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/',
            'guardian_name'       => 'nullable|string|max:255',
            'guardian_occupation' => 'nullable|string|max:255',
            'guardian_cell'       => 'nullable|string|min:10|max:20',
            'present_address'     => 'required|string',
            'permanent_address'   => 'required|string',
            'photo'               => 'required|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
        ], $examinationRules, $documentsRules);
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'examination' => json_decode($this->input('examination') ?? '[]', true),
            'dob'         => $this->input('dob') ? Carbon::parse($this->input('dob'))->format('Y-m-d') : null,
        ]);
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        // Get program details to include in error messages
        $programGroups   = app(ProgramGroupService::class)->getProgramGroups();
        $programs        = $programGroups->flatMap(fn ($group) => $group['programs'])->values();
        $programId       = $this->input('program_id');
        $selectedProgram = null;
        $examAttributes  = [];

        if ($programId) {
            $selectedProgram = collect($programs)->firstWhere('id', $programId);
            $requiredResults = $selectedProgram['examination_results'] ?? [];

            // Create attributes for each examination field
            foreach ($requiredResults as $index => $result) {
                $examTitle                                               = $result['title'] ?? 'Examination';
                $examAttributes["examination.{$index}.name"]             = "{$examTitle} certificate name";
                $examAttributes["examination.{$index}.year"]             = "{$examTitle} year";
                $examAttributes["examination.{$index}.roll_no"]          = "{$examTitle} roll number";
                $examAttributes["examination.{$index}.total_marks"]      = "{$examTitle} total marks";
                $examAttributes["examination.{$index}.obtained_marks"]   = "{$examTitle} obtained marks";
                $examAttributes["examination.{$index}.subjects"]         = "{$examTitle} subjects";
                $examAttributes["examination.{$index}.board_university"] = "{$examTitle} board/university";
                $examAttributes["examination.{$index}.school_college"]   = "{$examTitle} school/college";
            }

            // Create attributes for document fields
            $documentRequirements = $selectedProgram['document_requirements'] ?? [];

            foreach ($documentRequirements as $index => $requirement) {
                $docName                                    = $requirement['document']['name'] ?? 'Document';
                $examAttributes["documents.{$index}.name"]  = $docName;
                $examAttributes["documents.{$index}.value"] = $docName;
            }
        }

        return array_merge([
            'shift'         => 'shift (Morning/Evening)',
            'program_id'    => 'program',
            'cell'          => 'phone number',
            'father_cell'   => 'father\'s phone number',
            'cnic'          => 'CNIC number (format: 12345-1234567-1)',
            'father_cnic'   => 'father\'s CNIC number (format: 12345-1234567-1)',
            'dob'           => 'date of birth',
            'guardian_cell' => 'guardian\'s phone number',
            'photo'         => 'candidate photograph',
        ], $examAttributes);
    }

    /**
     * Customize the error messages.
     */
    public function messages(): array
    {
        // Get program details for specific error messages
        $programGroups   = app(ProgramGroupService::class)->getProgramGroups();
        $programs        = $programGroups->flatMap(fn ($group) => $group['programs'])->values();
        $programId       = $this->input('program_id');
        $selectedProgram = null;
        $examMessages    = [];

        if ($programId) {
            $selectedProgram = collect($programs)->firstWhere('id', $programId);
            $requiredResults = $selectedProgram['examination_results'] ?? [];

            // Create specific messages for required examinations
            $requiredExamNames                    = implode(', ', array_column($requiredResults, 'title'));
            $examMessages['examination.min']      = "All required examination details must be provided for this program ({$requiredExamNames}).";
            $examMessages['examination.required'] = "Examination details are required for this program ({$requiredExamNames}).";

            // Add messages for each examination field
            foreach ($requiredResults as $index => $result) {
                $examTitle                                    = $result['title'] ?? 'Examination';
                $examMessages["examination.{$index}.name.in"] = "Please provide a valid examination type for {$examTitle}.";
            }
        }

        return array_merge([
            'shift.required'             => 'Please select a shift (Morning or Evening).',
            'shift.exists'               => 'Please select a valid shift from the available options.',
            'program_id.required'        => 'Please select a program to apply for.',
            'program_id.in'              => 'The selected program is not available. Please choose from the provided options.',
            'name.required'              => 'Candidate name is required.',
            'cell.required'              => 'Candidate phone number is required.',
            'cell.min'                   => 'Phone number must be at least 10 digits.',
            'cell.max'                   => 'Phone number cannot exceed 20 digits.',
            'father_name.required'       => 'Father\'s name is required.',
            'father_cell.required'       => 'Father\'s phone number is required.',
            'father_cell.min'            => 'Father\'s phone number must be at least 10 digits.',
            'father_cell.max'            => 'Father\'s phone number cannot exceed 20 digits.',
            'cnic.required'              => 'CNIC number is required.',
            'cnic.regex'                 => 'CNIC must be in the format: 12345-1234567-1.',
            'cnic.unique'                => 'This CNIC has already been used for this program and shift combination.',
            'father_cnic.required'       => 'Father\'s CNIC number is required.',
            'father_cnic.regex'          => 'Father\'s CNIC must be in the format: 12345-1234567-1.',
            'domicile.required'          => 'Domicile is required.',
            'religion.required'          => 'Religion field is required.',
            'dob.required'               => 'Date of birth is required.',
            'dob.before'                 => 'Date of birth must be before today.',
            'dob.date_format'            => 'Date of birth must be in YYYY-MM-DD format.',
            'email.required'             => 'Email address is required.',
            'email.email'                => 'Please provide a valid email address.',
            'father_occupation.required' => 'Father\'s occupation is required.',
            'guardian_cell.min'          => 'Guardian\'s phone number must be at least 10 digits.',
            'guardian_cell.max'          => 'Guardian\'s phone number cannot exceed 20 digits.',
            'present_address.required'   => 'Present address is required.',
            'permanent_address.required' => 'Permanent address is required.',
            'photo.required'             => 'Candidate photograph is required.',
            'photo.image'                => 'The uploaded file must be an image.',
            'photo.mimes'                => 'The photograph must be a JPG, JPEG, or PNG file.',
            'photo.max'                  => 'The photograph should be less than 2MB.',

            // Generic examination field messages that will be replaced by specific ones when possible
            'examination.*.name.required'             => 'Examination name is required.',
            'examination.*.year.required'             => 'Examination year is required.',
            'examination.*.year.digits'               => 'Examination year must be 4 digits.',
            'examination.*.year.between'              => 'Examination year must be between 1900 and the current year.',
            'examination.*.roll_no.required'          => 'Examination roll number is required.',
            'examination.*.total_marks.required'      => 'Total marks are required.',
            'examination.*.total_marks.numeric'       => 'Total marks must be a number.',
            'examination.*.obtained_marks.required'   => 'Obtained marks are required.',
            'examination.*.obtained_marks.numeric'    => 'Obtained marks must be a number.',
            'examination.*.subjects.required'         => 'Subjects are required.',
            'examination.*.board_university.required' => 'Board/University is required.',
            'examination.*.school_college.required'   => 'School/College is required.',

            // Document messages
            'documents.required'      => 'Required documents must be uploaded.',
            'documents.*.value.file'  => 'The uploaded document must be a file.',
            'documents.*.value.mimes' => 'Documents must be in PDF format.',
            'documents.*.value.max'   => 'Documents should be less than 5MB.',
        ], $examMessages);
    }

    /**
     * Handle a failed validation attempt with user-friendly messages.
     *
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors         = $validator->errors();
        $friendlyErrors = collect($errors->messages())
            ->map(function ($messages, $field) {
                // Transform array-based field names to more readable format
                if (preg_match('/^examination\.(\d+)\.(.+)$/', $field, $matches)) {
                    $index     = $matches[1];
                    $fieldName = $matches[2];

                    // Try to get the actual examination name if available
                    $examName = $this->input("examination.{$index}.name");

                    if (! empty($examName)) {
                        return [
                            'field'          => $field,
                            'readable_field' => "{$examName} {$fieldName}",
                            'messages'       => $messages,
                        ];
                    }

                    // If we're here, we either couldn't get the examination name or it wasn't provided
                    // Try to get program info to determine which examination is required
                    $programGroups = app(ProgramGroupService::class)->getProgramGroups();
                    $programs      = $programGroups->flatMap(fn ($group) => $group['programs'])->values();
                    $programId     = $this->input('program_id');

                    if ($programId) {
                        $selectedProgram = collect($programs)->firstWhere('id', $programId);
                        $requiredResults = $selectedProgram['examination_results'] ?? [];

                        if (isset($requiredResults[$index])) {
                            $examTitle = $requiredResults[$index]['title'] ?? 'Examination #'.($index + 1);

                            return [
                                'field'          => $field,
                                'readable_field' => "{$examTitle} {$fieldName}",
                                'messages'       => $messages,
                            ];
                        }
                    }

                    // Fall back to a generic but more readable format
                    return [
                        'field'          => $field,
                        'readable_field' => 'Examination #'.($index + 1)." {$fieldName}",
                        'messages'       => $messages,
                    ];
                }

                // Handle document fields
                if (preg_match('/^documents\.(\d+)\.(.+)$/', $field, $matches)) {
                    $index     = $matches[1];
                    $fieldName = $matches[2];

                    // Try to get the actual document name if available
                    $docName = $this->input("documents.{$index}.name");

                    if (! empty($docName)) {
                        return [
                            'field'          => $field,
                            'readable_field' => "{$docName}",
                            'messages'       => $messages,
                        ];
                    }

                    // Fall back to generic document name
                    return [
                        'field'          => $field,
                        'readable_field' => 'Document #'.($index + 1)." {$fieldName}",
                        'messages'       => $messages,
                    ];
                }

                return [
                    'field'          => $field,
                    'readable_field' => $field,
                    'messages'       => $messages,
                ];
            })
            ->values()
            ->all();

        // Get the first error with its user-friendly field name
        $firstError   = collect($friendlyErrors)->first();
        $firstMessage = isset($firstError['messages'][0]) ? $firstError['messages'][0] : 'Validation failed';

        // If it's an array field error, make it more user-friendly
        if (isset($firstError['readable_field']) && $firstError['readable_field'] !== $firstError['field']) {
            $firstMessage = str_replace(
                $firstError['field'],
                $firstError['readable_field'],
                $firstMessage
            );
        }

        throw new HttpResponseException(response()->json([
            'success'         => false,
            'message'         => $firstMessage,
            'errors'          => $errors,
            'readable_errors' => collect($friendlyErrors)->pluck('messages', 'readable_field')->toArray(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
