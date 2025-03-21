<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Examination;
use App\Models\AdmissionForm;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()
            ->password('asdf1234')
            ->create([
                'name' => 'Admin',
                'email' => 'admin@gmail.com',    
            ]);
    }
}
