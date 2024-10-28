<?php

namespace Tests\Unit;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_can_be_created()
    {
        $user = User::factory()->create();

        $post = Post::create([
            'user_id' => $user->id,
            'title' => 'Sample Post',
            'content' => 'This is a sample post content.',
        ]);

        $this->assertInstanceOf(Post::class, $post);
        $this->assertEquals('Sample Post', $post->title);
        $this->assertEquals('This is a sample post content.', $post->content);
        $this->assertEquals($user->id, $post->user_id);
    }

    public function test_post_belongs_to_user()
    {
        $user = User::factory()->create();
        $post = Post::create([
            'user_id' => $user->id,
            'title' => 'Another Sample Post',
            'content' => 'Content for another sample post.',
        ]);

        $this->assertEquals($user->id, $post->user->id);
        $this->assertEquals($user->name, $post->user->name);
    }

    public function test_post_can_have_comments()
    {
        $post = Post::factory()->create();

        $comment = $post->comments()->create([
            'user_id' => User::factory()->create()->id,
            'comment' => 'This is a comment.',
        ]);

        $this->assertCount(1, $post->comments);
        $this->assertEquals('This is a comment.', $post->comments()->first()->comment);
    }

    public function test_post_can_be_deleted()
    {
        $post = Post::factory()->create();

        $this->assertDatabaseHas('posts', ['id' => $post->id]);

        $post->delete();

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }
}
