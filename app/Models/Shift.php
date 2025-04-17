<?php

namespace App\Models;

use App\StatusTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shift extends Model
{
    /** @use HasFactory<\Database\Factories\ShiftFactory> */
    use HasFactory;
    use StatusTrait;

    protected $fillable = [
        'name',
        'status',
    ];

    public function subjectCombinations(): HasMany
    {
        return $this->hasMany(SubjectCombination::class);
    }
}
