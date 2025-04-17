<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormsTableController;
use App\Http\Controllers\ProgramGroupController;
use App\Http\Controllers\AdmissionFormController;
use App\Http\Controllers\ExaminationResultController;
use App\Http\Controllers\DocumentRequirementController;
use App\Http\Controllers\SubjectCombinationController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/admission-form', [AdmissionFormController::class, 'index'])->name('admission-form.index');
Route::post('/admission-form', [AdmissionFormController::class, 'store'])->name('admission-form.store');
Route::get('/admission-form/success', [AdmissionFormController::class, 'success'])->name('admission-form.success');
Route::get('/admission-form/{form}/download-pdf', [AdmissionFormController::class, 'downloadPdf'])->name('admission-form.download-pdf');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admission Forms
    Route::prefix('admission-forms')->name('admission-forms.')->group(function () {
        Route::get('/', [FormsTableController::class, 'index'])->name('index');
        Route::get('/{id}', [FormsTableController::class, 'show'])->name('show');
        Route::get('/export', [FormsTableController::class, 'export'])->name('export');
    });
    Route::post('/admission-form/{id}/status', [FormsTableController::class, 'updateStatus'])->name('admission-form.update-status');

    // Documents
    Route::get('/document/{documentKey}/view/{formNo}', [DocumentController::class, 'viewDocument'])->name('document.view');

    // Shifts
    Route::resource('shifts', ShiftController::class);

    // Programs
    Route::resource('programs', ProgramController::class);
    Route::get('/programs/{program}/examination-results', [ProgramController::class, 'examinationResults'])->name('programs.examination-results');
    Route::post('/programs/{program}/examination-results', [ProgramController::class, 'assignExaminationResults'])->name('programs.assign-examination-results');

    // Program Groups
    Route::resource('program-groups', ProgramGroupController::class);
    Route::get('/program-groups/{programGroup}/examination-results', [ProgramGroupController::class, 'examinationResults'])->name('program-groups.examination-results');
    Route::post('/program-groups/{programGroup}/examination-results', [ProgramGroupController::class, 'assignExaminationResults'])->name('program-groups.assign-examination-results');

    // Examination Results
    Route::resource('examination-results', ExaminationResultController::class);

    // Document Requirements
    Route::resource('document-requirements', DocumentRequirementController::class);

    // Document Routes
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{document}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    // Subject Combinations Routes
    Route::resource('subject-combinations', SubjectCombinationController::class);
});
