<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdmissionFormController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/admission-form', [AdmissionFormController::class, 'index'])->name('admission-form.index');
Route::post('/admission-form', [AdmissionFormController::class, 'store'])->name('admission-form.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
