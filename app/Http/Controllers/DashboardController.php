<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdmissionFormsExport;
use App\Http\Resources\AdmissionFormResource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Fetch stats
        $totalAdmissions = AdmissionForm::count();
        $pendingForms    = AdmissionForm::where('status', 'pending')->count();
        $approvedForms   = AdmissionForm::where('status', 'approved')->count();

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

        return Inertia::render('Dashboard/index', [
            'stats' => [
                'totalAdmissions' => $totalAdmissions,
                'pendingForms'    => $pendingForms,
                'approvedForms'   => $approvedForms,
            ],
            'admissionForms' => AdmissionFormResource::collection($admissionForms),
            'filters'        => [
                'search'   => $search,
                'per_page' => $perPage,
            ],
        ]);
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
