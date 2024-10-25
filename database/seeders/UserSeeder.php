<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::factory()->count(10)->create(); // Creates 10 random users

        if (User::where('email', 'guest@gmail.com')->exists()) {
            return;
        }

        User::factory()->create([
            'id' => -1,
            'name' => 'Guest',
            'email' => 'guest@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
