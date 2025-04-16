<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Shift;
use App\Models\AdmissionForm;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Http\Services\AdmissionService;
use App\Http\Services\ProgramGroupService;
use App\Exceptions\AdmissionProcessingException;
use App\Http\Requests\StoreAdmissionFormRequest;

class AdmissionFormController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private ProgramGroupService $programGroupService,
        private AdmissionService $admissionService
    ) {
        //
    }

    public function index()
    {
        // Cache program groups to improve performance
        $programGroups = Cache::remember('program_groups', 3600, function () {
            return $this->programGroupService->getProgramGroups();
        });

        $shifts = Shift::active()->get();

        return Inertia::render('AdmissionForm/index', compact('programGroups', 'shifts'));
    }

    public function store(StoreAdmissionFormRequest $request)
    {
        $requestId  = uniqid('admission_');
        $logContext = ['request_id' => $requestId, 'ip' => $request->ip()];

        try {
            Log::channel('admission_form')->info('Processing admission form submission', $logContext);

            $data = $request->validated();

            // Create the admission form
            $admissionForm = $this->admissionService->store($data, $request);

            // Handle case where service returns a response instead of a model
            if ($admissionForm instanceof JsonResponse) {
                return $admissionForm;
            }

            $redirectUrl = $this->admissionService->generateSuccessUrl($admissionForm);

            Log::channel('admission_form')->info(
                'Admission form submitted successfully',
                $logContext + ['form_id' => $admissionForm->id]
            );

            return response()->json([
                'success'     => true,
                'message'     => 'Admission form submitted successfully!',
                'redirectUrl' => $redirectUrl,
                'form_id'     => $admissionForm->id,
            ]);
        } catch (AdmissionProcessingException $e) {
            Log::channel('admission_form')->error(
                'Validation error in admission form',
                $logContext + ['error' => $e->getMessage(), 'code' => $e->getCode()]
            );

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 422);
        } catch (\Exception $e) {
            Log::channel('admission_form')->error(
                'Error submitting admission form',
                $logContext + [
                    'error' => $e->getMessage(),
                    'file'  => $e->getFile(),
                    'line'  => $e->getLine(),
                ]
            );

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your application. Please try again later.',
            ], 500);
        }
    }

    public function success()
    {
        try {
            $form_data = request()->query('form_data');

            if (! $form_data) {
                return redirect()->route('admission-form.index')
                    ->with('error', 'Invalid form data.');
            }

            $form = $this->admissionService->getAdmissionFormForData($form_data);

            if (! $form) {
                Log::channel('admission_form')->warning('Invalid or expired form data', [
                    'form_data' => $form_data,
                    'ip'        => request()->ip(),
                ]);

                return redirect()->route('admission-form.index')
                    ->with('error', 'The form link has expired or is invalid.');
            }

            return Inertia::render('AdmissionForm/success', compact('form'));
        } catch (\Exception $e) {
            Log::channel('admission_form')->error('Error retrieving admission form', [
                'error' => $e->getMessage(),
                'ip'    => request()->ip(),
            ]);

            return redirect()->route('admission-form.index')
                ->with('error', 'Something went wrong. Please try again or contact support.');
        }
    }

    public function downloadPdf(AdmissionForm $form)
    {
        $form->load('program.programGroup', 'examinations');
        return view('pdf.admission-form', compact('form'));
    }
}
