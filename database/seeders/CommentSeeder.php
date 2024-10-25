<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // Get all posts
        $posts = Post::all();

        // Create 2-5 comments for each post
        foreach ($posts as $post) {
            Comment::factory()->count(rand(2, 5))->create([
                'post_id' => $post->id,
                'user_id' => User::inRandomOrder()->first()->id, // Random user for each comment
            ]);
        }
    }
}