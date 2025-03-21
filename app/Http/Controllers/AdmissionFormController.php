<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;
use Illuminate\Validation\Rule;
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

            if ($data['program_category'] !== config('programs.groups.0.category')) {
                unset($data['inter_subjects']);
            }

            // Create the admission form
            $admissionForm = AdmissionForm::create($data);

            // Store examination records
            $resultsRequired = collect(config('programs.groups'))->where('category', $data['program_category'])->first()['results_required'];

            foreach ($examinationData as $details) {
                if ($this->examinationShouldStore($details, $resultsRequired)) {
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

            $redirectUrl = route('admission-form.success', ['form_data' => base64_encode(serialize($admissionForm))]);

            return response()->json(['message' => 'Admission form submitted successfully!', 'redirectUrl' => $redirectUrl]);
        } catch (\Exception $e) {
            logger()->error('Error submitting admission form: '.$e->getMessage());

            return response()->json(['message' => 'An error occurred while submitting the admission form.'], 500);
        }
    }

    private function examinationShouldStore($examination, $resultsRequired)
    {
        return array_filter($examination) && array_filter($resultsRequired, function ($value) use ($examination) {
            return $value && $examination['name'] && str_contains(strtolower($examination['name']), strtolower($value));
        });
    }

    public function success($form_data)
    {
        try {
            $form_data = unserialize(base64_decode($form_data));

            $form = AdmissionForm::with('examinations')->whereKey($form_data['form_no'])->first();

            return Inertia::render('AdmissionForm/success', compact('form'));
        } catch (\Exception $e) {
            logger()->error('Error retrieving admission form: '.$e->getMessage());

            return redirect('/')->back()->with('error', 'Something went wrong. Please try again.');
        }
    }

    public function show($id)
    {
        $form = AdmissionForm::with('examinations')->findOrFail($id);

        return Inertia::render('AdmissionForm/show', compact('form'));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', Rule::in(AdmissionForm::STATUSES)],
        ]);

        $form = AdmissionForm::findOrFail($id);
        $form->update(['status' => $request->status]);

        return back()->with('success', 'Form status updated successfully.');
    }
}
