<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExaminationResult extends Model
{
    /** @use HasFactory<\Database\Factories\ExaminationResultFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'sub_title',
    ];

    public function programs()
    {
        return $this->belongsToMany(Program::class, 'program_examination_result');
    }

    public function programGroups()
    {
        return $this->belongsToMany(ProgramGroup::class, 'program_group_examination_result');
    }
}
