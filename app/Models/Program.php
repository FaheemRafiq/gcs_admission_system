<?php

namespace App\Models;

use App\StatusTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Program extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramFactory> */
    use HasFactory, StatusTrait;

    protected $fillable = [
        'name',
        'abbreviation',
        'program_group_id',
        'shift_id',
        'status',
    ];

    protected $appends = ['program_full_name'];

    public function getProgramAbbreviationAttribute()
    {
        return $this->abbreviation ?? $this->name;
    }

    public function getProgramFullNameAttribute()
    {
        return $this->programGroup?->name.' - '.$this->name;
    }

    public function programGroup()
    {
        return $this->belongsTo(ProgramGroup::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function subjectCombinations()
    {
        return $this->hasMany(SubjectCombination::class);
    }

    public function examinationResults()
    {
        return $this->belongsToMany(ExaminationResult::class, 'program_examination_result');
    }

    public function documentRequirements()
    {
        return $this->hasMany(DocumentRequirement::class);
    }
}
