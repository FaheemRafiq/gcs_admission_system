<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use App\Models\AdmissionForm;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdmissionFormFactory extends Factory
{
    protected $model = AdmissionForm::class;

    public function definition()
    {
        $programCategories = ['intermediate', 'bs', 'semester_5', 'associate'];
        $programCategory   = $this->faker->randomElement($programCategories);
        $programValues     = [
            'intermediate' => ['F.Sc. Pre-Med', 'F.Sc. Pre-Eng', 'ICS', 'FA'],
            'bs'           => ['Chemistry', 'Physics', 'Mathematics', 'Computer Science'],
            'semester_5'   => ['BBA', 'BS English', 'BS Economics'],
            'associate'    => ['AD Commerce', 'AD IT', 'AD Education'],
        ];

        return [
            'form_no'             => $this->faker->unique()->numberBetween(1, 10000),
            'diary_no'            => $this->faker->optional(0.3)->numerify('DN-#####'),
            'college_roll_no'     => $this->faker->optional(0.2)->numerify('CR-####'),
            'status'              => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'shift'               => $this->faker->randomElement(['Morning', 'Evening']),
            'program_category'    => $programCategory,
            'program_value'       => $this->faker->randomElement($programValues[$programCategory]),
            'name'                => $this->faker->name(),
            'cell'                => $this->faker->phoneNumber(),
            'father_name'         => $this->faker->name('male'),
            'father_cell'         => $this->faker->phoneNumber(),
            'cnic'                => $this->faker->unique()->numerify('#####-#######-#'),
            'domicile'            => $this->faker->city(),
            'religion'            => $this->faker->randomElement(['Islam', 'Christianity', 'Hinduism', 'Other']),
            'dob'                 => $this->faker->dateTimeBetween('-30 years', '-16 years')->format('Y-m-d'),
            'email'               => $this->faker->unique()->safeEmail(),
            'father_occupation'   => $this->faker->jobTitle(),
            'father_cnic'         => $this->faker->unique()->numerify('#####-#######-#'),
            'guardian_name'       => $this->faker->optional(0.4)->name(),
            'guardian_occupation' => $this->faker->optional(0.4)->jobTitle(),
            'guardian_cell'       => $this->faker->optional(0.4)->phoneNumber(),
            'present_address'     => $this->faker->address(),
            'permanent_address'   => $this->faker->address(),
            'inter_subjects'      => json_encode($this->faker->randomElements(
                ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Computer Science'],
                $this->faker->numberBetween(3, 5)
            )),
            'photo_path' => 'photos/'.Str::random(40).'.jpg',
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
