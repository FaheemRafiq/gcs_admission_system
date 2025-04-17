<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Shift;
use App\Models\SubjectCombination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectCombinationController extends Controller
{
    public function index()
    {
        $combinations = SubjectCombination::with(['program', 'shift'])
            ->latest()
            ->get();

        return Inertia::render('SubjectCombinations/Index', [
            'combinations' => $combinations,
        ]);
    }

    public function create()
    {
        $programs = Program::all();
        $shifts = Shift::active()->get();

        return Inertia::render('SubjectCombinations/Form', [
            'programs' => $programs,
            'shifts' => $shifts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'shift_id' => 'required|exists:shifts,id',
            'subjects' => 'required|array',
            'subjects.*' => 'required|string',
        ]);

        SubjectCombination::create($validated);

        return redirect()->route('subject-combinations.index')
            ->with('success', 'Subject combination created successfully.');
    }

    public function edit(SubjectCombination $subjectCombination)
    {
        $programs   = Program::all();
        $shifts     = Shift::active()->get();

        $updatedSubjectCombination = [];

        if (isset($subjectCombination->subjects) && is_string($subjectCombination->subjects)) {
            $updatedSubjectCombination = explode(',', $subjectCombination->subjects);

            $subjectCombination->subjects_array = $updatedSubjectCombination;
        }

        return Inertia::render('SubjectCombinations/Form', [
            'combination' => $subjectCombination,
            'programs' => $programs,
            'shifts' => $shifts,
        ]);
    }

    public function update(Request $request, SubjectCombination $subjectCombination)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'shift_id' => 'required|exists:shifts,id',
            'subjects' => 'required|array',
            'subjects.*' => 'required|string',
        ]);

        $subjectCombination->update($validated);

        return redirect()->route('subject-combinations.index')
            ->with('success', 'Subject combination updated successfully.');
    }

    public function destroy(SubjectCombination $subjectCombination)
    {
        $subjectCombination->delete();

        return redirect()->route('subject-combinations.index')
            ->with('success', 'Subject combination deleted successfully.');
    }
}
