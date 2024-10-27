<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run()
    {
        // Get all users
        $users = User::all();

        // Create 3-5 posts for each user
        foreach ($users as $user) {
            Post::factory()->forUser($user)->count(2)->create();
        }
    }
}
