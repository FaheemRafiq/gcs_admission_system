<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormExamination extends Model
{
    protected $fillable = [
        'admission_form_id',
        'name',
        'year',
        'roll_no',
        'total_marks',
        'obtained_marks',
        'subjects',
        'board_university',
        'school_college',
    ];

    protected $appends = ['percentage'];

    // Accessors
    public function getPercentageAttribute()
    {
        return ($this->obtained_marks / $this->total_marks) * 100;
    }

    // Relationships
    public function admissionForm(): BelongsTo
    {
        return $this->belongsTo(AdmissionForm::class, 'admission_form_id', 'form_no');
    }
}
