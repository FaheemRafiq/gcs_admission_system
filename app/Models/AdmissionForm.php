<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
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
        'program_id',
        'college_roll_no',
        'subject_combination',
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
        'photo_path',
        'status',
        'documents',
    ];

    protected $casts = [
        'dob' => 'date',
    ];

    protected $appends = ['form_key'];

    public const STATUSES = ['pending', 'approved', 'rejected'];

    public const PENDING = 'pending';

    public const APPROVED = 'approved';

    public const REJECTED = 'rejected';

    // Accessors & Mutators
    public function getPhotoPathAttribute($value)
    {
        return Storage::disk('public')->url($value);
    }

    public function getFormKeyAttribute()
    {
        return $this->program?->program_abbreviation.'-'.substr($this->shift, 0, 3).'-'.$this->getKey();
    }

    public function setDocumentsAttribute($value)
    {
        $this->attributes['documents'] = is_array($value) ? json_encode($value) :
            (is_string($value) && ($decoded = json_decode($value, true)) ? json_encode($decoded) : null);
    }

    public function getDocumentsAttribute($value)
    {
        $documents = $value ? json_decode($value, true) : null;

        if (is_array($documents)) {
            foreach ($documents as $key => $document) {
                $documents[$key]['key'] = Str::snake($document['name']);
            }
        }

        return $documents;
    }

    // Relationships
    public function examinations(): HasMany
    {
        return $this->hasMany(FormExamination::class, 'admission_form_id', 'form_no');
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
