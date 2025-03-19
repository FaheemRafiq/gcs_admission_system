<?php

return [
    'groups' => [
        [
            'category'         => 'intermediate',
            'label'            => 'Group For Intermediate Class',
            'options'          => ['F.Sc.Pre-Med', 'F.Sc.Pre-Eng', 'F.A', 'G.Sc', 'I.Com', 'I.C.S'],
            'results_required' => [
                'matric',
            ],
        ],
        [
            'category' => 'bs',
            'label'    => 'Major Discipline For BS 4-Year Program',
            'options'  => [
                'BBA', 'Botany', 'Bio. Tech', 'Chemistry', 'Communication Studies', 'Economics',
                'Education (B.Ed)', 'English', 'Geography', 'Ict. Education', 'Information Technology (IT)', 'Mathematics', 'Physics',
                'Pol. Science', 'Sociology', 'Statistics', 'Urdu', 'Zoology',
            ],
            'results_required' => [
                'matric',
                'intermediate',
            ],
        ],
        [
            'category'         => 'semester_5',
            'label'            => 'Department For Semester 5',
            'options'          => ['Chemistry', 'Physics', 'Mathematics', 'Zoology'],
            'results_required' => [
                'matric',
                'intermediate',
            ],
        ],
        [
            'category'         => 'associate',
            'label'            => 'Associate Degree',
            'options'          => ['B.Com (IT)'],
            'results_required' => [
                'matric',
                'intermediate',
            ],
        ],
    ],
];
