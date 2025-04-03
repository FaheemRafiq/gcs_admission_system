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
        Schema::create('document_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Document::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\ProgramGroup::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\Program::class)->nullable()->constrained()->cascadeOnUpdate();
            $table->boolean('is_required')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_requirements');
    }
};
