<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AdmissionForm;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch stats
        $totalAdmissions = AdmissionForm::count();
        $pendingForms    = AdmissionForm::where('status', 'pending')->count();
        $approvedForms   = AdmissionForm::where('status', 'approved')->count();

        // Fetch admission forms with necessary fields
        $admissionForms = AdmissionForm::select([
            'form_no',
            'name',
            'program_category',
            'program_value',
            'shift',
            'status',
            'created_at',
            'photo_path'
        ])->orderBy('created_at', 'desc')->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalAdmissions' => $totalAdmissions,
                'pendingForms'    => $pendingForms,
                'approvedForms'   => $approvedForms,
            ],
            'admissionForms' => $admissionForms,
        ]);
    }
}
