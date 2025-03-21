<?php

namespace Database\Factories;

use App\Models\Examination;
use App\Models\AdmissionForm;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExaminationFactory extends Factory
{
    protected $model = Examination::class;

    public function definition()
    {
        $examNames = ['Matric', 'Intermediate', 'Associate Degree'];
        $examName  = $this->faker->randomElement($examNames);
        $yearRange = [
            'Matric'           => ['-10 years', '-6 years'],
            'Intermediate'     => ['-6 years', '-2 years'],
            'Associate Degree' => ['-2 years', 'now'],
        ];

        return [
            'admission_form_id' => AdmissionForm::factory(),
            'name'              => $examName,
            'year'              => $this->faker->year($this->faker->dateTimeBetween(...$yearRange[$examName])),
            'roll_no'           => $this->faker->numerify('#####'),
            'marks'             => $this->faker->numberBetween(300, 1100),
            'percentage'        => $this->faker->numberBetween(33, 100),
            'subjects'          => implode(', ', $this->faker->randomElements(
                ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Urdu', 'Pakistan Studies'],
                $this->faker->numberBetween(4, 7)
            )),
            'board_university' => $this->faker->randomElement([
                'BISE Lahore', 'BISE Karachi', 'University of Punjab', 'AIOU', 'BIEK',
            ]),
            'school_college' => $this->faker->company().' '.$this->faker->randomElement(['School', 'College']),
            'created_at'     => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at'     => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
