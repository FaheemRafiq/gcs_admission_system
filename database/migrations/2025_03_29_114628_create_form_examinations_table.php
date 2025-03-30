<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('form_examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admission_form_id')->constrained('admission_forms', 'form_no')->onDelete('cascade');
            $table->string('name');
            $table->string('year');
            $table->string('roll_no');
            $table->integer('total_marks');
            $table->integer('obtained_marks');
            $table->string('subjects');
            $table->string('board_university');
            $table->string('school_college');

            // Unique constraint to ensure one record per level per admission form
            $table->unique(['admission_form_id', 'name'], 'unique_examination_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_examinations');
    }
};
