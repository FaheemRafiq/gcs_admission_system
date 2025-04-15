<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Fetch stats
        $totalAdmissions = AdmissionForm::count();
        $pendingForms    = AdmissionForm::where('status', 'pending')->count();
        $approvedForms   = AdmissionForm::where('status', 'approved')->count();

        return Inertia::render('Dashboard/index', [
            'stats' => [
                'totalAdmissions' => $totalAdmissions,
                'pendingForms'    => $pendingForms,
                'approvedForms'   => $approvedForms,
            ],
        ]);
    }
}
