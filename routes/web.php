<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormsTableController;
use App\Http\Controllers\AdmissionFormController;

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
});
