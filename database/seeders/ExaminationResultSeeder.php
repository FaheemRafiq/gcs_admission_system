<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExaminationResult;

class ExaminationResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $results = [
            [
                'title'      => 'Matric (Arts/Science)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Intermediate (Arts/Science)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Associate Degree (Arts/Science)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        ExaminationResult::insert($results);
    }
}
