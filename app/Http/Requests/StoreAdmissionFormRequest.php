<?php

namespace App\Http\Requests;

use App\Models\AdmissionForm;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAdmissionFormRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $programGroups = config('programs.groups');

        $categories = array_column($programGroups, 'category');
        $programs   = array_column($programGroups, 'options');

        $programCategory  = $this->input('program.category');
        $examinationRules = [];

        if ($programCategory) {
            $requiredResults = collect($programGroups)
                ->firstWhere('category', $programCategory)['results_required'] ?? [];
            $examinationRules = [
                'examination'                         => 'required|array',
                'examination.matric'                  => in_array('matric', $requiredResults) ? 'required|array' : 'nullable|array',
                'examination.matric.name'             => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.year'             => in_array('matric', $requiredResults) ? 'required|string|max:4' : 'nullable|string|max:4',
                'examination.matric.roll_no'          => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.marks'            => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.percentage'       => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.subjects'         => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.board_university' => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.school_college'   => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',

                'examination.intermediate'                  => in_array('intermediate', $requiredResults) ? 'required|array' : 'nullable|array',
                'examination.intermediate.name'             => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.year'             => in_array('intermediate', $requiredResults) ? 'required|string|max:4' : 'nullable|string|max:4',
                'examination.intermediate.roll_no'          => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.marks'            => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.percentage'       => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.subjects'         => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.board_university' => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.school_college'   => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',

                'examination.associate'                  => in_array('associate', $requiredResults) ? 'required|array' : 'nullable|array',
                'examination.associate.name'             => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.year'             => in_array('associate', $requiredResults) ? 'required|string|max:4' : 'nullable|string|max:4',
                'examination.associate.roll_no'          => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.marks'            => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.percentage'       => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.subjects'         => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.board_university' => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.school_college'   => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
            ];
        }

        // now flatten the program arrays
        $programs = array_merge(...$programs);

        return array_merge([
            'shift'            => ['bail', 'required', Rule::in(AdmissionForm::SHIFTS)],
            'program_value'    => ['bail', 'required', 'string', 'max:255', Rule::in($programs)],
            'program_category' => ['bail', 'required', 'string', Rule::in($categories)],
            'name'             => 'required|string|max:255',
            'cell'             => 'required|string|max:255',
            'father_name'      => 'required|string|max:255',
            'father_cell'      => 'required|string|max:255',
            'cnic'             => [
                'required',
                'string',
                'max:255',
                Rule::unique('admission_forms')->where(function ($query) {
                    return $query
                        ->where('cnic', $this->input('cnic'))
                        ->where('shift', $this->input('shift'))
                        ->where('program_category', $this->input('program_category'))
                        ->where('program_value', $this->input('program_value'));
                }),
            ],
            'domicile'                                  => 'required|string|max:255',
            'religion'                                  => 'required|string|max:255',
            'dob'                                       => 'required|date',
            'email'                                     => 'required|email|max:255|unique:admission_forms,email',
            'father_occupation'                         => 'required|string|max:255',
            'father_cnic'                               => 'required|string|max:255',
            'guardian_name'                             => 'nullable|string|max:255',
            'guardian_occupation'                       => 'nullable|string|max:255',
            'guardian_cell'                             => 'nullable|string|max:255',
            'present_address'                           => 'required|string',
            'permanent_address'                         => 'required|string',
            'inter_subjects'                            => 'required|array',
            'inter_subjects.*'                          => 'string|max:255',
            'photo'                                     => 'required|image|max:2048', // Max 2MB
        ], $examinationRules);
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        //
    }

    /**
     * Customize the error messages (optional).
     */
    public function messages(): array
    {
        return [
            'cnic.unique'                       => 'This CNIC has already been used for this program and shift combination.',
            'program_value.required'            => 'Please select a program to apply for.',
            'shift.required'                    => 'Please select a shift (Morning or Evening).',
            'examination.matric.required'       => 'Matric examination details are required for this program.',
            'examination.intermediate.required' => 'Intermediate examination details are required for this program.',
            'examination.associate.required'    => 'Associate Degree examination details are required for this program.',
        ];
    }
}
