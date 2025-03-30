<?php

namespace App\Models;

use App\StatusTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProgramGroup extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramGroupFactory> */
    use HasFactory, StatusTrait;

    protected $fillable = [
        'name',
        'status',
    ];

    public function programs()
    {
        return $this->hasMany(Program::class);
    }

    public function examinationResults()
    {
        return $this->belongsToMany(ExaminationResult::class, 'program_group_examination_result');
    }
}
