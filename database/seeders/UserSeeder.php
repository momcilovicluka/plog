<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
