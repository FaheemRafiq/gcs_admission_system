<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_forms', function (Blueprint $table) {
            $table->id('form_no'); // Primary key
            $table->string('shift'); // Morning or Evening
            $table->string('program_category'); // e.g., intermediate, bs, semester_5, associate
            $table->string('program_value'); // e.g., F.Sc.Pre-Med, Chemistry, etc.
            $table->string('name'); // Applicant name
            $table->string('cell'); // Mobile number
            $table->string('father_name');
            $table->string('father_cell'); // Father's mobile number
            $table->string('cnic');
            $table->string('domicile')->nullable();
            $table->string('religion');
            $table->date('dob'); // Date of birth
            $table->string('email')->unique();
            $table->string('father_occupation');
            $table->string('father_cnic');
            $table->string('guardian_name')->nullable();
            $table->string('guardian_occupation')->nullable();
            $table->string('guardian_cell')->nullable();
            $table->text('present_address');
            $table->text('permanent_address');
            $table->json('inter_subjects');
            $table->string('photo_path');
            $table->timestamps();

            // Composite unique constraint
            $table->unique(['cnic', 'shift', 'program_category', 'program_value'], 'unique_admission_combo');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_forms');
    }
};