<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdmissionForm extends Model
{
    use HasFactory;

    protected $primaryKey = 'form_no';

    public $incrementing = true;

    protected $fillable = [
        'shift',
        'diary_no',
        'college_roll_no',
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
        'status',
    ];

    protected $casts = [
        'inter_subjects' => 'array',
        'dob'            => 'date',
    ];

    public const STATUSES = ['pending', 'approved', 'rejected'];

    public const SHIFTS = ['Morning', 'Evening'];

    public function getPhotoPathAttribute($value)
    {
        return asset('storage/'.$value);
    }

    // Relationship with examinations
    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class, 'admission_form_id', 'form_no');
    }
}
