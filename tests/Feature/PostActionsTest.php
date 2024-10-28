<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostActionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_owner_non_admin_cannot_see_delete_button()
    {
        $user = User::factory()->create(['role' => 'user']);
        $post = Post::factory()->create(['user_id' => 1]);

        $response = $this->actingAs($user)->get('/posts/' . $post->id);

        $response->assertStatus(200);
        $response->assertDontSee('Delete Post');
    }

    public function test_owner_can_delete_post()
    {
        $owner = User::factory()->create(['role' => 'user']);
        $post = Post::factory()->create(['user_id' => $owner->id]);

        $response = $this->actingAs($owner)->delete('/posts/' . $post->id);

        $response->assertRedirect('/posts');
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }
}
