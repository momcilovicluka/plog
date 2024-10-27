<?php

namespace Tests\Unit;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Policies\CommentPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentPolicyTest extends TestCase
{
    use RefreshDatabase;

    protected CommentPolicy $commentPolicy;

    protected function setUp(): void
    {
        parent::setUp();
        $this->commentPolicy = new CommentPolicy;
    }

    public function test_owner_can_update_comment()
    {
        $user = User::factory()->create();
        $comment = Comment::factory()->create(['user_id' => $user->id]);

        $response = $this->commentPolicy->update($user, $comment);

        $this->assertTrue($response->allowed());
    }

    public function test_non_owner_cannot_update_comment()
    {
        $owner = User::factory()->create();
        $nonOwner = User::factory()->create();
        $comment = Comment::factory()->create(['user_id' => $owner->id]);

        $response = $this->commentPolicy->update($nonOwner, $comment);

        $this->assertFalse($response->allowed());
        $this->assertEquals('You do not own this comment.', $response->message());
    }

    public function test_owner_can_delete_comment()
    {
        $user = User::factory()->create();
        $comment = Comment::factory()->create(['user_id' => $user->id]);

        $response = $this->commentPolicy->delete($user, $comment);

        $this->assertTrue($response->allowed());
    }

    public function test_post_owner_can_delete_comment()
    {
        $postOwner = User::factory()->create();
        $commentOwner = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $postOwner->id]);
        $comment = Comment::factory()->create(['user_id' => $commentOwner->id, 'post_id' => $post->id]);

        $response = $this->commentPolicy->delete($postOwner, $comment);

        $this->assertTrue($response->allowed());
    }

    public function test_admin_can_delete_any_comment()
    {
        $adminUser = User::factory()->create(['role' => 'admin']);
        $commentOwner = User::factory()->create();
        $comment = Comment::factory()->create(['user_id' => $commentOwner->id]);

        $response = $this->commentPolicy->delete($adminUser, $comment);

        $this->assertTrue($response->allowed());
    }

    public function test_non_owner_cannot_delete_comment()
    {
        $owner = User::factory()->create();
        $nonOwner = User::factory()->create();
        $comment = Comment::factory()->create(['user_id' => $owner->id]);

        $response = $this->commentPolicy->delete($nonOwner, $comment);

        $this->assertFalse($response->allowed());
        $this->assertEquals('You are not authorized to delete this comment.', $response->message());
    }
}
