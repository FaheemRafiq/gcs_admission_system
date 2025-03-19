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
            $table->string('name'); // e.g., matric, intermediate, associate
            $table->string('year')->nullable();
            $table->string('roll_no')->nullable();
            $table->string('marks')->nullable();
            $table->string('percentage')->nullable();
            $table->string('subjects')->nullable();
            $table->string('board_university')->nullable();
            $table->string('school_college')->nullable();
            $table->timestamps();

            // Unique constraint to ensure one record per level per admission form
            $table->unique(['admission_form_id', 'name'], 'unique_examination_level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};