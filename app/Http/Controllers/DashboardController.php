<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AdmissionForm;
use App\Models\Program;
use App\Models\ProgramGroup;
use App\Models\ExaminationResult;
use App\Models\Shift;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic Stats
        $totalAdmissions = AdmissionForm::count();
        $pendingForms = AdmissionForm::where('status', 'pending')->count();
        $approvedForms = AdmissionForm::where('status', 'approved')->count();
        $rejectedForms = AdmissionForm::where('status', 'rejected')->count();

        // Program Stats
        $programStats = Program::withCount('admissionForms')
            ->orderBy('admission_forms_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($program) {
                return [
                    'name' => $program->name,
                    'count' => $program->admission_forms_count,
                ];
            });

        // Program Group Stats
        $programGroupStats = ProgramGroup::withCount('programs')
            ->orderBy('programs_count', 'desc')
            ->get()
            ->map(function ($group) {
                return [
                    'name' => $group->name,
                    'count' => $group->programs_count,
                ];
            });

        // Status Distribution
        $statusDistribution = AdmissionForm::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return [
                    'status' => $item->status,
                    'count' => $item->count,
                ];
            });

        // Monthly Admissions
        $monthlyAdmissions = AdmissionForm::select(
            DB::raw('strftime("%Y-%m", created_at) as month'),
            DB::raw('count(*) as count')
        )
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->month,
                    'count' => $item->count,
                ];
            });

        // Shift Distribution
        $shiftDistribution = AdmissionForm::select('shift', DB::raw('count(*) as count'))
            ->groupBy('shift')
            ->get()
            ->map(function ($item) {
                return [
                    'shift' => $item->shift,
                    'count' => $item->count,
                ];
            });

        // Examination Results Usage
        $examinationResultsUsage = ExaminationResult::withCount('programs')
            ->orderBy('programs_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($result) {
                return [
                    'title' => $result->title,
                    'count' => $result->programs_count,
                ];
            });

        return Inertia::render('Dashboard/index', [
            'stats' => [
                'totalAdmissions' => $totalAdmissions,
                'pendingForms' => $pendingForms,
                'approvedForms' => $approvedForms,
                'rejectedForms' => $rejectedForms,
            ],
            'programStats' => $programStats,
            'programGroupStats' => $programGroupStats,
            'statusDistribution' => $statusDistribution,
            'monthlyAdmissions' => $monthlyAdmissions,
            'shiftDistribution' => $shiftDistribution,
            'examinationResultsUsage' => $examinationResultsUsage,
        ]);
    }
}
