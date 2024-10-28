<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_user_can_view_all_posts()
    {
        $user = User::factory()->create();
        $posts = Post::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('posts.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->has('posts', 3));
    }

    public function test_user_can_create_post()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post(route('posts.store'), [
            'title' => 'Test Post Title',
            'content' => 'This is the content of the test post.',
        ]);

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post Title',
            'content' => 'This is the content of the test post.',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_cannot_create_post_without_title()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post(route('posts.store'), [
            'content' => 'This post has no title.',
        ]);

        $response->assertSessionHasErrors('title');
    }

    public function test_user_cannot_create_post_without_content()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post(route('posts.store'), [
            'title' => 'Test Post Title',
        ]);

        $response->assertSessionHasErrors('content');
    }

    public function test_user_can_view_single_post()
    {
        $post = Post::factory()->create();
        $response = $this->get(route('posts.show', $post->id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->has('post'));
    }

    public function test_user_can_edit_own_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('posts.edit', $post->id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->has('post'));
    }

    public function test_user_can_update_own_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->put(route('posts.update', $post->id), [
            'title' => 'Updated Post Title',
            'content' => 'Updated content of the post.',
        ]);

        $response->assertRedirect(route('posts.show', $post->id));
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Updated Post Title',
            'content' => 'Updated content of the post.',
        ]);
    }

    public function test_user_cannot_update_other_users_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($user)->put(route('posts.update', $post->id), [
            'title' => 'Attempting to Update',
            'content' => 'Some content.',
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('posts', [
            'title' => 'Attempting to Update',
        ]);
    }

    public function test_user_can_delete_own_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('posts.destroy', $post->id));

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseMissing('posts', [
            'id' => $post->id,
        ]);
    }

    public function test_user_cannot_delete_other_users_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($user)->delete(route('posts.destroy', $post->id));

        $response->assertStatus(403);
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
        ]);
    }
}
