<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use App\Models\AdmissionForm;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdmissionFormFactory extends Factory
{
    protected $model = AdmissionForm::class;

    public function definition()
    {
        return [
            'diary_no'            => $this->faker->optional(0.3)->numerify('DN-#####'),
            'college_roll_no'     => $this->faker->optional(0.2)->numerify('CR-####'),
            'status'              => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'shift'               => $this->faker->randomElement(['Morning', 'Evening']),
            'program_id'          => Program::inRandomOrder()->first()->id,
            'subject_combination' => $this->faker->optional()->randomElement(['Pre-Med', 'Pre-Eng', 'ICS', 'FA', 'BBA', 'BS English']),
            'name'                => $this->faker->name(),
            'cell'                => $this->faker->phoneNumber(),
            'father_name'         => $this->faker->name('male'),
            'father_cell'         => $this->faker->phoneNumber(),
            'cnic'                => $this->faker->unique()->numerify('#####-#######-#'),
            'domicile'            => $this->faker->optional()->city(),
            'religion'            => $this->faker->randomElement(['Islam', 'Christianity', 'Hinduism', 'Other']),
            'dob'                 => $this->faker->dateTimeBetween('-30 years', '-16 years')->format('Y-m-d'),
            'email'               => $this->faker->unique()->safeEmail(),
            'father_occupation'   => $this->faker->jobTitle(),
            'father_cnic'         => $this->faker->unique()->numerify('#####-#######-#'),
            'guardian_name'       => $this->faker->optional(0.4)->name(),
            'guardian_occupation' => $this->faker->optional(0.4)->jobTitle(),
            'guardian_cell'       => $this->faker->optional(0.4)->phoneNumber(),
            'present_address'     => $this->faker->text(),
            'permanent_address'   => $this->faker->text(),
            'photo_path'          => 'photos/'.Str::random(40).'.jpg',
            'documents'           => json_encode([
                [
                    'key' => 'matric_certificate',
                    'name' => 'Matric Certificate',
                    'is_required' => true,
                    'value' => 'documents/'.Str::random(40).'.pdf'
                ],
                [
                    'key' => 'intermediate_certificate',
                    'name' => 'Intermediate Certificate',
                    'is_required' => true,
                    'value' => 'documents/'.Str::random(40).'.pdf'
                ],
                [
                    'key' => 'character_certificate',
                    'name' => 'Character Certificate',
                    'is_required' => false,
                    'value' => $this->faker->optional(0.7)->passthrough('documents/'.Str::random(40).'.pdf')
                ]
            ]),
            'created_at'          => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at'          => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
