<?php

use App\Models\Program;
use App\Models\ProgramGroup;
use App\Models\Shift;
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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation', 10)->nullable();
            $table->foreignIdFor(ProgramGroup::class)->constrained()->cascadeOnDelete();
            // NULL shift means the program is available for all shifts
            $table->foreignIdFor(Shift::class)->nullable()->constrained()->nullOnDelete();
            $table->enum('status', Program::STATUSES)->default(Program::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
