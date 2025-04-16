<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentRequirement extends Model
{
    protected $fillable = ['document_id', 'program_group_id', 'program_id', 'is_required'];

    protected $casts = [
        'is_required' => 'bool',
    ];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (! $model->program_group_id && ! $model->program_id) {
                throw new \Exception('Either program_group_id or program_id must be provided.');
            }
        });
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function program_group(): BelongsTo
    {
        return $this->belongsTo(ProgramGroup::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}
