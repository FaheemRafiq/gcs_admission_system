<?php

namespace Database\Seeders;

use App\Models\Shift;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create Morning and Evening shifts
        Shift::factory()->create([
            'name' => 'Morning',
        ]);

        Shift::factory()->create([
            'name' => 'Evening',
        ]);
    }
}
