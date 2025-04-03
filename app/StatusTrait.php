<?php

namespace App;

trait StatusTrait
{
    public const ACTIVE = 'active';

    public const INACTIVE = 'inactive';

    public const STATUSES = [
        self::ACTIVE,
        self::INACTIVE,
    ];

    public function scopeActive($query)
    {
        return $query->where('status', self::ACTIVE);
    }

    public function scopeInactive($query)
    {
        return $query->where('status', self::INACTIVE);
    }

    public function scopeWhereStatus($query, $value)
    {
        return $query->where('status', $value);
    }

    public function scopeWhereNotStatus($query, $value)
    {
        return $query->where('status', '!=', $value);
    }
}
