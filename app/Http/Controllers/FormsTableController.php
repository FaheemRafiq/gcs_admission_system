<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdmissionFormsExport;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AdmissionFormResource;

class FormsTableController extends Controller
{
    public function index(Request $request)
    {
        // Get query parameters
        $search  = $request->query('search', '');
        $perPage = $request->query('per_page', 10); // Default to 10 items per page

        // Build the query
        $query = AdmissionForm::select([
            'form_no',
            'name',
            'email',
            'cell',
            'father_name',
            'father_cell',
            'program_id',
            'subject_combination',
            'shift',
            'status',
            'created_at',
            'photo_path',
        ])->with([
            'program' => function ($q) {
                $q->select('id', 'name', 'abbreviation', 'program_group_id')->with('programGroup:id,name');
            },
        ])
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('form_no', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('program', 'like', "%{$search}%");
            });
        }

        // Paginate the results with preserved query parameters
        $admissionForms = $query->paginate($perPage)->appends([
            'search'   => $search,
            'per_page' => $perPage,
        ]);

        return Inertia::render('FormsTable/index', [
            'admissionForms' => AdmissionFormResource::collection($admissionForms),
            'filters'        => [
                'search'   => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function show($id)
    {
        try {
            $form = Cache::remember("admission_form_{$id}", 300, function () use ($id) {
                return AdmissionForm::with(['examinations' => fn ($q) => $q->orderBy('id', 'ASC'), 'program.programGroup'])->findOrFail($id);
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

    public function updateStatus(Request $request, $id)
    {
        try {
            $form = AdmissionForm::findOrFail($id);

            $oldStatus = $form->status;
            $newStatus = $request->status;

            $validator = Validator::make($request->all(), [
                'status' => ['required', Rule::in(AdmissionForm::STATUSES)],
            ]);

            if ($validator->fails()) {
                return back()->with('error', $validator->errors()->first());
            }

            $statusUpdated = $form->update([
                'status'  => $newStatus,
            ]);

            $message = "Admission form status updated from {$oldStatus} to {$newStatus}";

            // Clear cached form data
            Cache::forget("admission_form_{$id}");

            Log::channel('admission_form')->info('Form status updated', [
                'form_id'        => $id,
                'old_status'     => $oldStatus,
                'new_status'     => $newStatus,
                'updated_by'     => auth()->id(),
                'status_updated' => $statusUpdated,
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

    public function export(Request $request)
    {
        $filters = $request->only([
            'status',
            'program',
            'shift',
            'start_date',
            'end_date',
            'search',
        ]);

        return Excel::download(new AdmissionFormsExport($filters), 'admission_forms_'.date('Y-m-d').'.xlsx');
    }
}
