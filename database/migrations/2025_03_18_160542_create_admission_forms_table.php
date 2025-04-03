<?php

use App\Models\Program;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_forms', function (Blueprint $table) {
            $table->id('form_no'); // Primary key
            $table->string('diary_no')->nullable();
            $table->string('college_roll_no')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('shift'); // Morning or Evening
            $table->foreignIdFor(Program::class)->constrained()->nullOnDelete();
            $table->string('subject_combination')->nullable();
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
            $table->string('photo_path');
            $table->json('documents')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_forms');
    }
};