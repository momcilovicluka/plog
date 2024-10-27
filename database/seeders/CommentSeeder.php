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
        $posts = Post::all();

        foreach ($posts as $post) {
            $userIds = User::pluck('id')->shuffle()->take(rand(2, 5));

            foreach ($userIds as $userId) {
                Comment::factory()->create([
                    'post_id' => $post->id,
                    'user_id' => $userId,
                ]);
            }
        }
    }
}
