<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ExaminationResult;

class ExaminationResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $examinationResults = ExaminationResult::all();

        return Inertia::render('ExaminationResults/Index', [
            'examinationResults' => $examinationResults,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ExaminationResults/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        ExaminationResult::create($validated);

        return redirect()->route('examination-results.index')->with('success', 'Examination result created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExaminationResult $examinationResult)
    {
        return Inertia::render('ExaminationResults/Form', [
            'examinationResult' => $examinationResult,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExaminationResult $examinationResult)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $examinationResult->update($validated);

        return redirect()->route('examination-results.index')->with('success', 'Examination result updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExaminationResult $examinationResult)
    {
        $examinationResult->delete();

        return redirect()->route('examination-results.index')->with('success', 'Examination result deleted successfully.');
    }
}
