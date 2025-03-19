<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdmissionForm extends Model
{
    protected $primaryKey = 'form_no';

    public $incrementing = true;

    protected $fillable = [
        'shift',
        'program_category',
        'program_value',
        'name',
        'cell',
        'father_name',
        'father_cell',
        'cnic',
        'domicile',
        'religion',
        'dob',
        'email',
        'father_occupation',
        'father_cnic',
        'guardian_name',
        'guardian_occupation',
        'guardian_cell',
        'present_address',
        'permanent_address',
        'inter_subjects',
        'photo_path',
    ];

    protected $casts = [
        'inter_subjects' => 'array',
        'dob'            => 'date',
    ];

    public const SHIFTS = ['Morning', 'Evening'];

    // Relationship with examinations
    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class, 'admission_form_id', 'form_no');
    }
}
