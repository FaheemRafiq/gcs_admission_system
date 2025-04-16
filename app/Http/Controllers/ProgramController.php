<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Shift;
use App\Models\Program;
use App\Models\ProgramGroup;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = Program::with('programGroup')->get();

        return Inertia::render('Programs/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $programGroups = ProgramGroup::all();
        $shifts        = Shift::all();

        return Inertia::render('Programs/Form', [
            'program_groups' => $programGroups,
            'shifts'         => $shifts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'program_group_id' => 'required|exists:program_groups,id',
            'shift_id'         => 'required|exists:shifts,id',
            'status'           => 'required|in:active,inactive',
        ]);

        Program::create($validated);

        return redirect()->route('programs.index')->with('success', 'Program created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program)
    {
        $programGroups = ProgramGroup::all();
        $shifts        = Shift::all();

        return Inertia::render('Programs/Form', [
            'program'        => $program,
            'program_groups' => $programGroups,
            'shifts'         => $shifts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'program_group_id' => 'required|exists:program_groups,id',
            'shift_id'         => 'required|exists:shifts,id',
            'status'           => 'required|in:active,inactive',
        ]);

        $program->update($validated);

        return redirect()->route('programs.index')->with('success', 'Program updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program)
    {
        $program->delete();

        return redirect()->route('programs.index')->with('success', 'Program deleted successfully.');
    }

    /**
     * Show the form for assigning examination results to a program.
     */
    public function examinationResults(Program $program)
    {
        $examinationResults = \App\Models\ExaminationResult::all();
        $assignedResults    = $program->examinationResults()->pluck('id')->toArray();

        return Inertia::render('Programs/ExaminationResults', [
            'program'            => $program,
            'examinationResults' => $examinationResults,
            'assignedResults'    => $assignedResults,
        ]);
    }

    /**
     * Assign examination results to a program.
     */
    public function assignExaminationResults(Request $request, Program $program)
    {
        $validated = $request->validate([
            'examination_results'   => 'required|array',
            'examination_results.*' => 'exists:examination_results,id',
        ]);

        $program->examinationResults()->sync($validated['examination_results']);

        return redirect()->route('programs.index')->with('success', 'Examination results assigned successfully.');
    }
}
