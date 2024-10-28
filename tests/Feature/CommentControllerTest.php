<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class CommentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_user_can_add_comment_to_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->actingAs($user)->post('/posts/' . $post->id . '/comments', [
            'comment' => 'This is a test comment.',
        ]);

        $response->assertRedirect(route('posts.show', $post->id));
        $this->assertDatabaseHas('comments', [
            'comment' => 'This is a test comment.',
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);
    }

    public function test_user_cannot_add_empty_comment()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->actingAs($user)->post('/posts/' . $post->id . '/comments', [
            'comment' => '',
        ]);

        $response->assertSessionHasErrors('comment');
    }

    public function test_user_can_delete_own_comment()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);

        Gate::define('delete', function ($user, Comment $comment) {
            return $user->id === $comment->user_id;
        });

        $response = $this->actingAs($user)->delete('/comments/' . $comment->id);

        $response->assertRedirect()->with('success', 'Comment deleted successfully.');
        $this->assertDatabaseMissing('comments', [
            'id' => $comment->id,
        ]);
    }

    public function test_user_cannot_delete_other_users_comment()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'post_id' => $post->id,
            'user_id' => $otherUser->id,
        ]);

        Gate::define('delete', function ($user, Comment $comment) {
            return $user->id === $comment->user_id;
        });

        $response = $this->actingAs($user)->delete('/comments/' . $comment->id);

        $response->assertStatus(403);
        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
        ]);
    }
}
