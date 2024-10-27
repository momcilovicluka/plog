<?php

namespace Tests\Unit;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_comment_can_be_created()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $comment = Comment::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'comment' => 'This is a sample comment.',
        ]);

        $this->assertInstanceOf(Comment::class, $comment);
        $this->assertEquals('This is a sample comment.', $comment->comment);
        $this->assertEquals($user->id, $comment->user_id);
        $this->assertEquals($post->id, $comment->post_id);
    }

    public function test_comment_belongs_to_post()
    {
        $post = Post::factory()->create();
        $comment = Comment::create([
            'user_id' => User::factory()->create()->id,
            'post_id' => $post->id,
            'comment' => 'Another comment.',
        ]);

        $this->assertEquals($post->id, $comment->post->id);
        $this->assertEquals($post->title, $comment->post->title);
    }

    public function test_comment_belongs_to_user()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $comment = Comment::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'comment' => 'Comment by user.',
        ]);

        $this->assertEquals($user->id, $comment->user->id);
        $this->assertEquals($user->name, $comment->user->name);
    }

    public function test_comment_can_be_deleted()
    {
        $comment = Comment::factory()->create();

        $this->assertDatabaseHas('comments', ['id' => $comment->id]);

        $comment->delete();

        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }
}
