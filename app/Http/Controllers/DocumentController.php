<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Http\Request;
use App\Models\AdmissionForm;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function viewDocument($documentKey, $formNo)
    {
        $form = AdmissionForm::whereKey($formNo)->select('form_no', 'documents')->first();

        if (! $form || empty($form->documents)) {
            return back()->with('error', 'Admission form not found.');
        }

        $filePath = '';

        foreach ($form->documents as $document) {
            if ($document['key'] === $documentKey) {
                $filePath = $document['path'];
                break;
            }
        }

        if (empty($filePath)) {
            return back()->with('error', 'Document not found.');
        }

        if (! Storage::disk('private')->exists($filePath)) {
            return back()->with('error', 'Document not found.');
        }

        $filePath = Storage::disk('private')->path($filePath);

        // dd($filePath);

        return response()->file($filePath, [
            'Content-Type'        => mime_content_type($filePath),
            'Content-Disposition' => 'inline; filename="'.basename($filePath).'"',
        ]);
    }

    public function index()
    {
        try {
            $documents = Document::all();
            Log::info('Documents retrieved successfully', ['count' => $documents->count()]);

            return Inertia::render('Documents/Index', [
                'documents' => $documents,
            ]);
        } catch (\Exception $e) {
            Log::error('Error retrieving documents', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->with('error', 'Failed to retrieve documents.');
        }
    }

    public function create()
    {
        try {
            Log::info('Document creation form accessed');

            return Inertia::render('Documents/Form');
        } catch (\Exception $e) {
            Log::error('Error accessing document creation form', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->with('error', 'Failed to access document creation form.');
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:documents,name',
                // 'document_key' => 'required|string|max:255|unique:documents',
            ]);

            $document = Document::create($validated);
            Log::info('Document created successfully', [
                'document_id' => $document->id,
                'name'        => $document->name,
            ]);

            return redirect()->route('documents.index')
                ->with('success', 'Document created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating document', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'input' => $request->all(),
            ]);

            return back()->with('error', 'Failed to create document.');
        }
    }

    public function edit(Document $document)
    {
        try {
            Log::info('Document edit form accessed', [
                'document_id' => $document->id,
            ]);

            return Inertia::render('Documents/Form', [
                'document' => $document,
            ]);
        } catch (\Exception $e) {
            Log::error('Error accessing document edit form', [
                'error'       => $e->getMessage(),
                'trace'       => $e->getTraceAsString(),
                'document_id' => $document->id,
            ]);

            return back()->with('error', 'Failed to access document edit form.');
        }
    }

    public function update(Request $request, Document $document)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:documents,name,'.$document->id,
                // 'document_key' => 'required|string|max:255|unique:documents,document_key,' . $document->id,
            ]);

            $document->update($validated);
            Log::info('Document updated successfully', [
                'document_id' => $document->id,
                'name'        => $document->name,
            ]);

            return redirect()->route('documents.index')
                ->with('success', 'Document updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating document', [
                'error'       => $e->getMessage(),
                'trace'       => $e->getTraceAsString(),
                'document_id' => $document->id,
                'input'       => $request->all(),
            ]);

            return back()->with('error', 'Failed to update document.');
        }
    }

    public function destroy(Document $document)
    {
        try {
            $document->delete();
            Log::info('Document deleted successfully', [
                'document_id' => $document->id,
                'name'        => $document->name,
            ]);

            return redirect()->route('documents.index')
                ->with('success', 'Document deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting document', [
                'error'       => $e->getMessage(),
                'trace'       => $e->getTraceAsString(),
                'document_id' => $document->id,
            ]);

            return back()->with('error', 'Failed to delete document.');
        }
    }
}
