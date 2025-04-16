<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    protected $appends = ['document_key'];

    public function getDocumentKeyAttribute()
    {
        return Str::snake($this->name);
    }

    public function documentRequirements()
    {
        return $this->hasMany(DocumentRequirement::class);
    }
}
