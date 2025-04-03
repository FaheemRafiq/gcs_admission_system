<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Shift;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Http\Services\AdmissionService;
use Illuminate\Support\Facades\Validator;
use App\Http\Services\ProgramGroupService;
use App\Http\Resources\AdmissionFormResource;
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

    /**
     * Display the admission form.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Cache program groups to improve performance
        $programGroups = Cache::remember('program_groups', 3600, function () {
            return $this->programGroupService->getProgramGroups();
        });

        $shifts = Shift::active()->get();

        return Inertia::render('AdmissionForm/index', compact('programGroups', 'shifts'));
    }

    /**
     * Store a newly created admission form.
     *
     * @return \Illuminate\Http\JsonResponse
     */
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

            Log::channel('admission_form')->info('Admission form submitted successfully',
                $logContext + ['form_id' => $admissionForm->id]);

            return response()->json([
                'success'       => true,
                'message'       => 'Admission form submitted successfully!',
                'redirectUrl'   => $redirectUrl,
                'form_id'       => $admissionForm->id,
            ]);
        } catch (AdmissionProcessingException $e) {
            Log::channel('admission_form')->error('Validation error in admission form',
                $logContext + ['error' => $e->getMessage(), 'code' => $e->getCode()]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 422);
        } catch (\Exception $e) {
            Log::channel('admission_form')->error('Error submitting admission form',
                $logContext + [
                    'error' => $e->getMessage(),
                    'file'  => $e->getFile(),
                    'line'  => $e->getLine(),
                ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your application. Please try again later.',
            ], 500);
        }
    }

    /**
     * Display the success page after form submission.
     *
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
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

    /**
     * Display the specified admission form.
     *
     * @param  int  $id
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function show($id)
    {
        try {
            $form = Cache::remember("admission_form_{$id}", 300, function () use ($id) {
                return AdmissionForm::with(['examinations' => fn($q) => $q->orderBy('id', 'ASC'), 'program.programGroup'])->findOrFail($id);
            });

            if (! $form) {
                return redirect()->route('dashboard')
                    ->with('error', 'Admission form not found.');
            }

            return Inertia::render('AdmissionForm/show', [
                'form' => $form,
            ]);
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return redirect()->route('dashboard')
                ->with('error', 'You are not authorized to view this admission form.');
        } catch (\Exception $e) {
            Log::channel('admission_form')->error('Error viewing admission form', [
                'id'      => $id,
                'error'   => $e->getMessage(),
                'user_id' => auth()->id() ?? 'guest',
            ]);

            return redirect()->back()
                ->with('error', 'Unable to retrieve the admission form. Please try again.');
        }
    }

    /**
     * Update the status of an admission form.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $form = AdmissionForm::findOrFail($id);

            $oldStatus = $form->status;
            $newStatus = $request->status;

            $validator = Validator::make($request->all(), [
                'status' => ['required', Rule::in(AdmissionForm::STATUSES)]
            ]);

            if($validator->fails()) {
                return back()->with('error', $validator->errors()->first());
            }

            $statusUpdated = $form->update([
                'status'  => $newStatus
            ]);

            $message = "Admission form status updated from {$oldStatus} to {$newStatus}";

            // Clear cached form data
            Cache::forget("admission_form_{$id}");

            Log::channel('admission_form')->info('Form status updated', [
                'form_id'    => $id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
                'updated_by' => auth()->id(),
                'status_updated' => $statusUpdated
            ]);

            return back()->with('success', $message);
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return back()->with('error', 'You are not authorized to update this form status.');
        } catch (\Exception $e) {
            Log::channel('admission_form')->error('Error updating form status', [
                'form_id' => $id,
                'error'   => $e->getMessage(),
                'user_id' => auth()->id() ?? 'guest',
            ]);

            return back()->with('error', 'Failed to update form status. Please try again.');
        }
    }
}
