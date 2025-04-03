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
                'name'     => 'Intermediate',
                'programs' => [
                    [
                        'name'         => 'F.Sc.Pre-Med',
                        'abbreviation' => 'FScPM',
                    ],
                    [
                        'name'         => 'F.Sc.Pre-Eng',
                        'abbreviation' => 'FScPE',
                    ],
                    [
                        'name'         => 'F.A',
                        'combinations' => [
                            ['subjects' => 'Civics, Physical Education, Computer'],
                            ['subjects' => 'Computer, Statistics, Commerce'],
                            ['subjects' => 'Civics, Islamiat, Computer'],
                        ],
                        'abbreviation' => 'FA',
                    ],
                    [
                        'name'         => 'G.Sc',
                        'abbreviation' => 'GSC',
                    ],
                    [
                        'name'         => 'I.Com',
                        'abbreviation' => 'ICOM',
                    ],
                    [
                        'name'         => 'I.C.S',
                        'abbreviation' => 'ICS',
                    ],
                ],
            ],
            [
                'name'     => 'Bachelor of Science',
                'programs' => [
                    [
                        'name' => 'BBA',
                    ],
                    [
                        'name'         => 'Botany',
                        'abbreviation' => 'BOT',
                    ],
                    [
                        'name'         => 'Bio. Tech',
                        'abbreviation' => 'BioT',
                    ],
                    [
                        'name'         => 'Chemistry',
                        'abbreviation' => 'CHEM',
                    ],
                    [
                        'name'         => 'Communication Studies',
                        'abbreviation' => 'CMS',
                    ],
                    [
                        'name'         => 'Economics',
                        'abbreviation' => 'ECO',
                    ],
                    [
                        'name'         => 'Education (B.Ed)',
                        'abbreviation' => 'BED',
                    ],
                    [
                        'name'         => 'English',
                        'abbreviation' => 'ENG',
                    ],
                    [
                        'name'         => 'Geography',
                        'abbreviation' => 'GEO',
                    ],
                    [
                        'name'         => 'Ict. Education',
                        'abbreviation' => 'ICTE',
                    ],
                    [
                        'name'         => 'Information Technology (IT)',
                        'abbreviation' => 'IT',
                    ],
                    [
                        'name'         => 'Mathematics',
                        'abbreviation' => 'MATH',
                    ],
                    [
                        'name'         => 'Physics',
                        'abbreviation' => 'PHYS',
                    ],
                    [
                        'name'         => 'Pol. Science',
                        'abbreviation' => 'POL',
                    ],
                    [
                        'name'         => 'Sociology',
                        'abbreviation' => 'SOC',
                    ],
                    [
                        'name'         => 'Statistics',
                        'abbreviation' => 'STAT',
                    ],
                    [
                        'name'         => 'Urdu',
                        'abbreviation' => 'URD',
                    ],
                    [
                        'name'         => 'Zoology',
                        'abbreviation' => 'ZOO',
                    ],
                ],
            ],
            [
                'name'     => 'Semester 5',
                'programs' => [
                    [
                        'name'         => 'Chemistry',
                        'abbreviation' => 'CHEM',
                    ],
                    [
                        'name'         => 'Physics',
                        'abbreviation' => 'PHYS',
                    ],
                    [
                        'name'         => 'Mathematics',
                        'abbreviation' => 'MATH',
                    ],
                    [
                        'name'         => 'Zoology',
                        'abbreviation' => 'ZOO',
                    ],
                ],
            ],
            [
                'name'     => 'Associate Degree',
                'programs' => [
                    [
                        'name'         => 'B.Com (IT)',
                        'abbreviation' => 'BCOMIT',
                    ],
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
                    'abbreviation'     => $program['abbreviation'] ?? null,
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
