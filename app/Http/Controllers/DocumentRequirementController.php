<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Program;
use App\Models\Document;
use App\Models\ProgramGroup;
use Illuminate\Http\Request;
use App\Models\DocumentRequirement;

class DocumentRequirementController extends Controller
{
    public function index()
    {
        $documentRequirements = DocumentRequirement::with(['document', 'program_group', 'program'])->get();

        return Inertia::render('DocumentRequirements/Index', [
            'documentRequirements' => $documentRequirements,
        ]);
    }

    public function create()
    {
        $documents      = Document::all();
        $programs       = Program::all();
        $programGroups  = ProgramGroup::all();

        return Inertia::render('DocumentRequirements/Form', [
            'documents'      => $documents,
            'programs'       => $programs,
            'program_groups' => $programGroups,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'document_id'       => 'required|exists:documents,id',
            'program_group_id'  => 'required_without:program_id|exists:program_groups,id|nullable',
            'program_id'        => 'required_without:program_group_id|exists:programs,id|nullable',
            'is_required'       => 'required|boolean',
        ]);

        DocumentRequirement::create($validated);

        return redirect()->route('document-requirements.index')->with('success', 'Document requirement created successfully.');
    }

    public function edit(DocumentRequirement $documentRequirement)
    {
        $documents      = Document::all();
        $programs       = Program::all();
        $programGroups  = ProgramGroup::all();

        return Inertia::render('DocumentRequirements/Form', [
            'documentRequirement' => $documentRequirement,
            'documents'           => $documents,
            'programs'            => $programs,
            'program_groups'      => $programGroups,
        ]);
    }

    public function update(Request $request, DocumentRequirement $documentRequirement)
    {
        $validated = $request->validate([
            'document_id'       => 'required|exists:documents,id',
            'program_group_id'  => 'required_without:program_id|exists:program_groups,id|nullable',
            'program_id'        => 'required_without:program_group_id|exists:programs,id|nullable',
            'is_required'       => 'required|boolean',
        ]);

        $documentRequirement->update($validated);

        return redirect()->route('document-requirements.index')->with('success', 'Document requirement updated successfully.');
    }

    public function destroy(DocumentRequirement $documentRequirement)
    {
        $documentRequirement->delete();

        return redirect()->route('document-requirements.index')->with('success', 'Document requirement deleted successfully.');
    }
}
