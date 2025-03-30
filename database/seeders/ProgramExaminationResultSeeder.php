<?php

namespace Database\Seeders;

use App\Models\ProgramGroup;
use Illuminate\Database\Seeder;
use App\Models\ExaminationResult;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProgramExaminationResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Examination Results
        $matricResult       = ExaminationResult::where('title', 'LIKE', '%Matric%')->first();
        $intermediateResult = ExaminationResult::where('title', 'LIKE', '%Intermediate%')->first();
        $associateResult    = ExaminationResult::where('title', 'LIKE', '%Associate%')->first();

        // Program Groups

        // Intermediate
        $interGroup         = ProgramGroup::where('name', 'LIKE', '%Intermediate%')->first();

        if($interGroup) {
            $interGroup->examinationResults()->attach($matricResult);
        }

        // BS
        $bsGroup            = ProgramGroup::where('name', 'LIKE', '%BS%')->first();

        if($bsGroup) {
            $bsGroup->examinationResults()->attach($matricResult);
            $bsGroup->examinationResults()->attach($intermediateResult);
        }

        // 5th Semester
        $fifthSemester = ProgramGroup::where('name', 'LIKE', '%Semester%')->first();

        if($fifthSemester) {
            $fifthSemester->examinationResults()->attach($matricResult);
            $fifthSemester->examinationResults()->attach($intermediateResult);
            $fifthSemester->examinationResults()->attach($associateResult);
        }

        // Associate Degree
        $associateDegree = ProgramGroup::where('name', 'LIKE', '%Associate%')->first();

        if($associateDegree) {
            $associateDegree->examinationResults()->attach($matricResult);
            $associateDegree->examinationResults()->attach($intermediateResult);
        }


    }
}
