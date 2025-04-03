<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\ProgramGroup;
use Illuminate\Database\Seeder;
use App\Models\DocumentRequirement;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $interProgramGroup = ProgramGroup::where('name', 'LIKE', '%Intermediate%')->first();
        $documents         = [
            ['name' => 'Character Certificate'],
            ['name' => 'Matric or Inter Certificate'],
        ];

        foreach ($documents as $document) {
            $newDocument = Document::create($document);

            if ($interProgramGroup) {
                DocumentRequirement::create([
                    'document_id'      => $newDocument->id,
                    'program_group_id' => $interProgramGroup->id,
                ]);
            }
        }
    }
}
