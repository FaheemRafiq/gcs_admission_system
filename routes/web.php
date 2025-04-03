<?php

use App\Models\AdmissionForm;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdmissionFormController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/admission-form', [AdmissionFormController::class, 'index'])->name('admission-form.index');
Route::post('/admission-form', [AdmissionFormController::class, 'store'])->name('admission-form.store');
Route::get('/admission-form/success', [AdmissionFormController::class, 'success'])->name('admission-form.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/admission-forms/{id}', [AdmissionFormController::class, 'show'])->name('admission-forms.show');
    Route::get('/admission-forms/export', [DashboardController::class, 'export'])->name('admission-forms.export');

    Route::post('/admission-form/{id}/status', [AdmissionFormController::class, 'updateStatus'])->name('admission-form.update-status');

    // Documents
    Route::get('/document/{documentKey}/view/{formNo}', [DocumentController::class, 'viewDocument'])->name('document.view');
});

Route::get('testing', function () {
    $form = AdmissionForm::first();

    dd($form->documents);
});
