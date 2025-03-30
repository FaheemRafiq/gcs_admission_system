<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\ProgramGroup;
use Illuminate\Database\Seeder;

class ProgramGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programGroups = [
            [
                'name'     => 'Group For Intermediate Class',
                'programs' => [
                    ['name' => 'F.Sc.Pre-Med'],
                    ['name' => 'F.Sc.Pre-Eng'],
                    [
                        'name' => 'F.A',
                        'combinations' => [
                            ['subjects' => 'Civics, Physical Education, Computer'],
                            ['subjects' => 'Computer, Statistics, Commerce'],
                            ['subjects' => 'Civics, Islamiat, Computer'],
                        ]
                    ],
                    ['name' => 'G.Sc'],
                    ['name' => 'I.Com'],
                    ['name' => 'I.C.S'],
                ],
            ],
            [
                'name'     => 'Major Discipline For BS 4-Year Program',
                'programs' => [
                    ['name' => 'BBA'],
                    ['name' => 'Botany'],
                    ['name' => 'Bio. Tech'],
                    ['name' => 'Chemistry'],
                    ['name' => 'Communication Studies'],
                    ['name' => 'Economics'],
                    ['name' => 'Education (B.Ed)'],
                    ['name' => 'English'],
                    ['name' => 'Geography'],
                    ['name' => 'Ict. Education'],
                    ['name' => 'Information Technology (IT)'],
                    ['name' => 'Mathematics'],
                    ['name' => 'Physics'],
                    ['name' => 'Pol. Science'],
                    ['name' => 'Sociology'],
                    ['name' => 'Statistics'],
                    ['name' => 'Urdu'],
                    ['name' => 'Zoology'],
                ],
            ],
            [
                'name'     => 'Department For Semester 5',
                'programs' => [
                    ['name' => 'Chemistry'],
                    ['name' => 'Physics'],
                    ['name' => 'Mathematics'],
                    ['name' => 'Zoology'],
                ],
            ],
            [
                'name'     => 'Associate Degree',
                'programs' => [
                    ['name' => 'B.Com (IT)'],
                ],
            ],
        ];

        foreach ($programGroups as $programGroup) {
            $newGroup = ProgramGroup::create([
                'name'   => $programGroup['name'],
                'status' => 'active',
            ]);

            foreach ($programGroup['programs'] as $program) {
                $newProgram = Program::create([
                    'name'             => $program['name'],
                    'program_group_id' => $newGroup->id,
                    'status'           => 'active',
                ]);

                if (isset($program['combinations'])) {
                    foreach ($program['combinations'] as $combination) {
                        $newProgram->subjectCombinations()->create([
                            'subjects' => $combination['subjects'],
                        ]);
                    }
                }
            }
        }
    }
}
