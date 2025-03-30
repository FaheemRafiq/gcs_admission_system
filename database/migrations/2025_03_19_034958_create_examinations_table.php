<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admission_form_id')->constrained('admission_forms', 'form_no')->onDelete('cascade');
            $table->string('name');
            $table->string('year');
            $table->string('roll_no');
            $table->string('total_marks');
            $table->string('obtained_marks');
            $table->string('subjects');
            $table->string('board_university');
            $table->string('school_college');

            // Unique constraint to ensure one record per level per admission form
            $table->unique(['admission_form_id', 'name'], 'unique_examination_level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};