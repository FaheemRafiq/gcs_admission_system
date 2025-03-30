<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdmissionFormController;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/admission-form', [AdmissionFormController::class, 'index'])->name('admission-form.index');
Route::post('/admission-form', [AdmissionFormController::class, 'store'])->name('admission-form.store');
Route::get('/admission-form/{form_data}/success', [AdmissionFormController::class, 'success'])->name('admission-form.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/admission-form/{id}', [AdmissionFormController::class, 'show'])->name('admission-form.show');
    Route::post('/admission-form/{id}/status', [AdmissionFormController::class, 'updateStatus'])->name('admission-form.update-status');
    Route::get('/admission-forms/export', [DashboardController::class, 'export'])->name('admission-forms.export');
});
