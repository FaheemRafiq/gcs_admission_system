<?php

namespace App\Http\Requests;

use App\Models\AdmissionForm;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

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

        $programCategory  = $this->input('program_category');
        $examinationRules = [];

        if ($programCategory) {
            $requiredResults = collect($programGroups)
                ->firstWhere('category', $programCategory)['results_required'] ?? [];
            $examinationRules = [
                'examination'                         => 'required',
                'examination.matric'                  => in_array('matric', $requiredResults) ? 'required|array' : 'nullable|array',
                'examination.matric.name'             => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.year'             => in_array('matric', $requiredResults) ? 'required|numeric|digits_between:1,4' : 'nullable|numeric|digits_between:1,4',
                'examination.matric.roll_no'          => in_array('matric', $requiredResults) ? 'required|string|max:15' : 'nullable|string|max:15',
                'examination.matric.marks'            => in_array('matric', $requiredResults) ? 'required|numeric|digits_between:1,4' : 'nullable|numeric|digits_between:1,4',
                'examination.matric.percentage'       => in_array('matric', $requiredResults) ? 'required|numeric|digits_between:1,3' : 'nullable|numeric|digits_between:1,3',
                'examination.matric.subjects'         => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.board_university' => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.matric.school_college'   => in_array('matric', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',

                'examination.intermediate'                  => in_array('intermediate', $requiredResults) ? 'required|array' : 'nullable|array',
                'examination.intermediate.name'             => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.year'             => in_array('intermediate', $requiredResults) ? 'required|numeric|digits_between:1,4' : 'nullable|numeric|digits_between:1,4',
                'examination.intermediate.roll_no'          => in_array('intermediate', $requiredResults) ? 'required|string|max:15' : 'nullable|string|max:15',
                'examination.intermediate.marks'            => in_array('intermediate', $requiredResults) ? 'required|numeric|digits_between:1,4' : 'nullable|numeric|digits_between:1,4',
                'examination.intermediate.percentage'       => in_array('intermediate', $requiredResults) ? 'required|numeric|digits_between:1,3' : 'nullable|numeric|digits_between:1,3',
                'examination.intermediate.subjects'         => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.board_university' => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.intermediate.school_college'   => in_array('intermediate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',

                'examination.associate'                  => in_array('associate', $requiredResults) ? 'required|array' : 'nullable|array',
                'examination.associate.name'             => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.year'             => in_array('associate', $requiredResults) ? 'required|numeric|digits_between:1,4' : 'nullable|numeric|digits_between:1,4',
                'examination.associate.roll_no'          => in_array('associate', $requiredResults) ? 'required|string|max:15' : 'nullable|string|max:15',
                'examination.associate.marks'            => in_array('associate', $requiredResults) ? 'required|numeric|digits_between:1,4' : 'nullable|numeric|digits_between:1,4',
                'examination.associate.percentage'       => in_array('associate', $requiredResults) ? 'required|numeric|digits_between:1,3' : 'nullable|numeric|digits_between:1,3',
                'examination.associate.subjects'         => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.board_university' => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
                'examination.associate.school_college'   => in_array('associate', $requiredResults) ? 'required|string|max:255' : 'nullable|string|max:255',
            ];
        }

        $programs = array_merge(...$programs);

        return array_merge([
            'shift'            => ['bail', 'required', Rule::in(AdmissionForm::SHIFTS)],
            'program_value'    => ['bail', 'required', 'string', 'max:255', Rule::in($programs)],
            'program_category' => ['bail', 'required', 'string', Rule::in($categories)],
            'name'             => 'required|string|max:255',
            'cell'             => 'required|string|min:10|max:20',
            'father_name'      => 'required|string|max:255',
            'father_cell'      => 'required|string|min:10|max:20',
            'cnic'             => [
                'required',
                'string',
                'regex:/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/',
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
            'dob'                                       => 'required|date|before:today|date_format:Y-m-d',
            'email'                                     => 'required|email|max:255|unique:admission_forms,email',
            'father_occupation'                         => 'required|string|max:255',
            'father_cnic'                               => 'required|string|regex:/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/',
            'guardian_name'                             => 'nullable|string|max:255',
            'guardian_occupation'                       => 'nullable|string|max:255',
            'guardian_cell'                             => 'nullable|string|min:10|max:20',
            'present_address'                           => 'required|string',
            'permanent_address'                         => 'required|string',
            'inter_subjects'                            => 'required_if:program_category,intermediate|array',
            'inter_subjects.*'                          => 'required_if:program_category,intermediate|string|max:255',
            'photo'                                     => 'required|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
        ], $examinationRules);
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'examination'    => json_decode($this->input('examination') !== null ? $this->input('examination') : '{}', true),
            'inter_subjects' => json_decode($this->input('inter_subjects') !== null ? $this->input('inter_subjects') : '{}', true),
        ]);
    }

    /**
     * Customize the error messages (optional).
     */
    public function messages(): array
    {
        return [
            'shift.required'                      => 'Please select a shift (Morning or Evening).',
            'program_value.required'              => 'Please select a program to apply for.',
            'program_category.required'           => 'Please select a program to apply for.',
            'name.required'                       => 'Name of candidate is required.',
            'cell.required'                       => 'Candidate cell number is required.',
            'cnic.unique'                         => 'This CNIC has already been used for this program and shift combination.',
            'inter_subjects.required'             => 'Intermediate subjects are required for this program.',
            'inter_subjects.*.required'           => 'Please enter intermediate subjects.',
            'examination.matric.required'         => 'Matric examination details are required for this program.',
            'examination.matric.marks'            => 'Matric examination marks are required for this program.',
            'examination.matric.percentage'       => 'Matric examination percentage is required for this program.',
            'examination.intermediate.required'   => 'Intermediate examination details are required for this program.',
            'examination.intermediate.marks'      => 'Intermediate examination marks are required for this program.',
            'examination.intermediate.percentage' => 'Intermediate examination percentage is required for this program.',
            'examination.associate.required'      => 'Associate Degree examination details are required for this program.',
            'examination.associate.marks'         => 'Associate Degree examination marks are required for this program.',
            'examination.associate.percentage'    => 'Associate Degree examination percentage is required for this program.',
            'photo.max'                           => 'Photo should be less then 2MB.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @return void
     *
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $validator->errors()->first(),
            'errors'  => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
