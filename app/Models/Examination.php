<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'admission_form_id',
        'name',
        'year',
        'roll_no',
        'marks',
        'percentage',
        'subjects',
        'board_university',
        'school_college',
    ];

    public function admissionForm(): BelongsTo
    {
        return $this->belongsTo(AdmissionForm::class, 'admission_form_id', 'form_no');
    }
}
