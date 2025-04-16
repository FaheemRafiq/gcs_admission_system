<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProgramGroup;
use App\Models\ExaminationResult;
use Illuminate\Http\Request;

class ProgramGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programGroups = ProgramGroup::all();

        return Inertia::render('ProgramGroups/Index', [
            'programGroups' => $programGroups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ProgramGroups/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        ProgramGroup::create($validated);

        return redirect()->route('program-groups.index')->with('success', 'Program group created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgramGroup $programGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgramGroup $programGroup)
    {
        return Inertia::render('ProgramGroups/Form', [
            'programGroup' => $programGroup,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProgramGroup $programGroup)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $programGroup->update($validated);

        return redirect()->route('program-groups.index')->with('success', 'Program group updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgramGroup $programGroup)
    {
        $programGroup->delete();

        return redirect()->route('program-groups.index')->with('success', 'Program group deleted successfully.');
    }

    /**
     * Show the form for assigning examination results to a program group.
     */
    public function examinationResults(ProgramGroup $programGroup)
    {
        $examinationResults = ExaminationResult::all();
        $assignedResults = $programGroup->examinationResults()->pluck('id')->toArray();

        return Inertia::render('ProgramGroups/ExaminationResults', [
            'programGroup' => $programGroup,
            'examinationResults' => $examinationResults,
            'assignedResults' => $assignedResults,
        ]);
    }

    /**
     * Assign examination results to a program group.
     */
    public function assignExaminationResults(Request $request, ProgramGroup $programGroup)
    {
        $validated = $request->validate([
            'examination_results' => 'required|array',
            'examination_results.*' => 'exists:examination_results,id',
        ]);

        $programGroup->examinationResults()->sync($validated['examination_results']);

        return redirect()->route('program-groups.index')->with('success', 'Examination results assigned successfully.');
    }
}
