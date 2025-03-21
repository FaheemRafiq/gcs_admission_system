<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Examination;
use App\Models\AdmissionForm;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 50 Admission Forms
        AdmissionForm::factory()
            ->count(50)
            ->create()
            ->each(function ($form) {
                // Define possible examination levels
                $examLevels = ['Matric', 'Intermediate', 'Associate Degree'];
                // Randomly select 1-3 levels for this form
                $selectedLevels = fake()->randomElements($examLevels, fake()->numberBetween(1, 3));

                // Create an examination for each selected level
                foreach ($selectedLevels as $level) {
                    Examination::factory()->create([
                        'admission_form_id' => $form->form_no,
                        'name'              => $level,
                    ]);
                }
            });
    }
}
