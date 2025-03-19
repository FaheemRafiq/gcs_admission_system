<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AdmissionForm;
use App\Http\Requests\StoreAdmissionFormRequest;

class AdmissionFormController extends Controller
{
    public function index()
    {
        $programGroups = config('programs.groups');
        $shifts        = AdmissionForm::SHIFTS;

        return Inertia::render('AdmissionForm/index', compact('programGroups', 'shifts'));
    }

    public function store(StoreAdmissionFormRequest $request)
    {
        try {
            $data = $request->validated();

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $path               = $request->file('photo')->store('photos', 'public');
                $data['photo_path'] = $path;
            }

            // Extract examination data
            $examinationData = $data['examination'];
            unset($data['examination']);

            // Rename program fields for storage
            $data['program_category'] = $data['program_category'];
            $data['program_value']    = $data['program_value'];

            // Ensure inter_subjects is stored as JSON
            $data['inter_subjects'] = json_encode($data['inter_subjects']);

            // Create the admission form
            $admissionForm = AdmissionForm::create($data);

            // Store examination records
            foreach ($examinationData as $details) {
                // Only create a record if at least one field is filled
                if (array_filter($details)) {
                    $admissionForm->examinations()->create([
                        'name'             => $details['name'],
                        'year'             => $details['year'],
                        'roll_no'          => $details['roll_no'],
                        'marks'            => $details['marks'],
                        'percentage'       => $details['percentage'],
                        'subjects'         => $details['subjects'],
                        'board_university' => $details['board_university'],
                        'school_college'   => $details['school_college'],
                    ]);
                }
            }

            return redirect()->back()->with('success', 'Admission form submitted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while submitting the admission form.');
        }
    }
}
