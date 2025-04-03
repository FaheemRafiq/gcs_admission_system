<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'name'  => 'Admin',
                'email' => 'admin@gmail.com',
            ]);

        $this->call(ShiftSeeder::class);

        $this->call(ProgramGroupSeeder::class);

        $this->call(ExaminationResultSeeder::class);

        $this->call(ProgramExaminationResultSeeder::class);

        $this->call(DocumentSeeder::class);
    }
}
