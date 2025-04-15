<?php

namespace App\Http\Services;

use App\Models\ProgramGroup;

class ProgramGroupService
{
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
        return ProgramGroup::select('id', 'name', 'status')
            ->with(
                [
                    'programs' => function ($query) {
                        $query
                            ->select('id', 'name', 'status', 'program_group_id', 'shift_id')
                            ->active()
                            ->with([
                                'examinationResults:id,title',
                                'subjectCombinations:id,program_id,subjects',
                                'documentRequirements' => function ($query) {
                                    $query->with('document');
                                },
                            ]);
                    },
                    'examinationResults:id,title',
                    'documentRequirements' => function ($query) {
                        $query->with('document');
                    },
                ]
            )
            ->active()
            ->get()
            ->transform(function ($programGroup) {
                return $this->updateProgramExamResultsAndDocuments($programGroup);
            });
    }

    /**
     * This method takes a ProgramGroup and merges the examination results of the group
     * with the examination results of each program in the group. It then removes the
     * examination results from the group and returns the updated group. This is used
     * to flatten the results of the programs in a group.
     *
     * Program-specific examination results and document requirements take priority
     * over those defined at the program group level.
     *
     * @param  ProgramGroup  $programGroup  The ProgramGroup to be updated.
     * @return array The updated ProgramGroup.
     */
    public function updateProgramExamResultsAndDocuments(ProgramGroup $programGroup)
    {
        $newProgramGroup = [];

        if ($programGroup->programs->count() > 0) {
            $newProgramGroup = $programGroup->toArray();

            $groupResults   = $newProgramGroup['examination_results']   ?? [];
            $groupDocuments = $newProgramGroup['document_requirements'] ?? [];

            foreach ($newProgramGroup['programs'] as $key => $program) {
                $programResults   = $program['examination_results']   ?? [];
                $programDocuments = $program['document_requirements'] ?? [];

                // Create associative arrays to make it easier to prioritize program-specific items
                $mergedResults   = [];
                $mergedDocuments = [];

                // First add group results/documents
                foreach ($groupResults as $result) {
                    $mergedResults[$result['id']] = $result;
                }

                foreach ($groupDocuments as $document) {
                    $documentId = $document['document']['id'] ?? $document['id'] ?? null;

                    if ($documentId) {
                        $mergedDocuments[$documentId] = $document;
                    }
                }

                // Then add program-specific results/documents (will overwrite group items with the same ID)
                foreach ($programResults as $result) {
                    $mergedResults[$result['id']] = $result;
                }

                foreach ($programDocuments as $document) {
                    $documentId = $document['document']['id'] ?? $document['id'] ?? null;

                    if ($documentId) {
                        $mergedDocuments[$documentId] = $document;
                    }
                }

                // Convert back to indexed arrays
                $program['examination_results']   = array_values($mergedResults);
                $program['document_requirements'] = array_values($mergedDocuments);

                $newProgramGroup['programs'][$key] = $program;
            }

            unset($newProgramGroup['examination_results'], $newProgramGroup['document_requirements']);
        }

        return $newProgramGroup;
    }
}
