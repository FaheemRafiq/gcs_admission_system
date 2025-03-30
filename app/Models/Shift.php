<?php

namespace App\Models;

use App\StatusTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shift extends Model
{
    /** @use HasFactory<\Database\Factories\ShiftFactory> */
    use HasFactory, StatusTrait;

    protected $fillable = [
        'name',
        'status',
    ];
}
