<?php

namespace Tests\Unit;

use App\Models\Post;
use App\Models\User;
use App\Policies\PostPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostPolicyTest extends TestCase
{
    use RefreshDatabase;

    protected PostPolicy $postPolicy;

    protected function setUp(): void
    {
        parent::setUp();
        $this->postPolicy = new PostPolicy();
    }

    public function test_owner_can_update_post()
    {
        $ownerUser = User::factory()->create(['id' => 1]);
        $post = Post::factory()->create(['user_id' => $ownerUser->id]);

        $response = $this->postPolicy->update($ownerUser, $post);

        $this->assertTrue($response->allowed());
    }

    public function test_non_owner_cannot_update_post()
    {
        $nonOwnerUser = User::factory()->create(['role' => 'user']);
        $post = Post::factory()->create(['user_id' => 2]);

        $response = $this->postPolicy->update($nonOwnerUser, $post);

        $this->assertFalse($response->allowed());
        $this->assertEquals('You do not own this post.', $response->message());
    }

    public function test_admin_can_delete_post()
    {
        $adminUser = User::factory()->create(['role' => 'admin']);
        $post = Post::factory()->create(['user_id' => 1]);

        $response = $this->postPolicy->delete($adminUser, $post);

        $this->assertTrue($response->allowed());
    }

    public function test_owner_can_delete_post()
    {
        $ownerUser = User::factory()->create(['id' => 1]);
        $post = Post::factory()->create(['user_id' => $ownerUser->id]);

        $response = $this->postPolicy->delete($ownerUser, $post);

        $this->assertTrue($response->allowed());
    }

    public function test_non_owner_cannot_delete_post()
    {
        $nonOwnerUser = User::factory()->create(['role' => 'user']);
        $post = Post::factory()->create(['user_id' => 1]);

        $response = $this->postPolicy->delete($nonOwnerUser, $post);

        $this->assertFalse($response->allowed());
        $this->assertEquals('You do not own this post.', $response->message());
    }
}
