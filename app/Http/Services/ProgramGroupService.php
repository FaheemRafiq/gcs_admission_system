<?php

namespace App\Http\Services;

use Illuminate\Support\Str;
use App\Models\ProgramGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class ProgramGroupService
{
    protected const CACHE_EXPIRATION  = 10;
    protected const PROGRAM_GROUP_KEY = 'program_group_key';

    /**
     * Retrieve a collection of active program groups with their associated programs
     * and examination results. The data is cached for a specified duration to improve
     * performance. If the cache exists, the cached data is returned. Otherwise, the
     * program groups are fetched from the database, processed, and then cached.
     * 
     * @return \Illuminate\Support\Collection The collection of program groups.
     */

    public function getProgramGroups()
    {
        if (Cache::has(self::PROGRAM_GROUP_KEY)) {
            $programGroups = Cache::get(self::PROGRAM_GROUP_KEY);
        } else {
            $programGroups = ProgramGroup::select('id', 'name', 'status')
                ->with(
                [
                    'programs' => function ($query) {
                        $query
                            ->select('id', 'name', 'status', 'program_group_id', 'shift_id')
                            ->active()
                            ->with([
                                'examinationResults:id,title,sub_title', 
                                'subjectCombinations:id,program_id,subjects'
                            ]);
                    },
                    'examinationResults:id,title,sub_title'
                ])
                ->active()
                ->get()
                ->transform(function ($programGroup) {
                    return $this->updateProgramExamResults($programGroup);
                });

            Cache::put(self::PROGRAM_GROUP_KEY, $programGroups, now()->addMinutes(self::CACHE_EXPIRATION));
        }

        return $programGroups;
    }
    
    /**
     * This method takes a ProgramGroup and merges the examination results of the group 
     * with the examination results of each program in the group. It then removes the 
     * examination results from the group and returns the updated group. This is used 
     * to flatten the results of the programs in a group.
     * 
     * @param ProgramGroup $programGroup The ProgramGroup to be updated.
     * @return array The updated ProgramGroup.
     */
    public function updateProgramExamResults(ProgramGroup $programGroup) 
    {
        $newProgramGroup = [];

        if($programGroup->programs->count() > 0) {
            $newProgramGroup = $programGroup->toArray();
            $groupResults    = $newProgramGroup['examination_results'] ?? [];

            foreach($newProgramGroup['programs'] as $key => $program) {
                $programResults = $program['examination_results'] ?? [];

                $program['examination_results']      = array_unique(array_merge($groupResults, $programResults), SORT_REGULAR);
                $newProgramGroup['programs'][$key] = $program;
            }

            unset($newProgramGroup['examination_results']);
        }

        return $newProgramGroup;
    }
}
