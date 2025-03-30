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
        Schema::create('program_group_examination_result', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\ProgramGroup::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\ExaminationResult::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_group_examination_result');
    }
};
