<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubjectCombination extends Model
{
    protected $fillable = [
        'program_id',
        'shift_id',
        'subjects',
    ];

    public function setSubjectsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['subjects'] = implode(',', $value);
        }
    }

    public function getSubjectsAttribute($value)
    {
        if ($value) {
            return explode(',', $value);
        }
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }
}
