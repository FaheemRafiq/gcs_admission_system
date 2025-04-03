<?php

namespace App\Http\Controllers;

use App\Models\AdmissionForm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function viewDocument($documentKey, $formNo)
    {
        $form = AdmissionForm::whereKey($formNo)->select('form_no', 'documents')->first();

        if (!$form || empty($form->documents)) {
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

        if(!Storage::disk('private')->exists($filePath)) {
            return back()->with('error', 'Document not found.');
        }

        $filePath = Storage::disk('private')->path($filePath);

        // dd($filePath);

        return response()->file($filePath, [
            'Content-Type'=> mime_content_type($filePath),
            'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"'
        ]);
    }
}
