<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WelcomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_displays_welcome_page_with_posts()
    {
        $posts = Post::factory()->count(3)->create();
        $response = $this->get('/');
        $response->assertStatus(200);

        foreach ($posts as $post) {
            $response->assertSee($post->title);
        }
    }

    public function test_shows_login_and_register_links_when_user_is_not_authenticated()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertSee('Login');
        $response->assertSee('Register');
    }

    public function test_user_can_access_welcome_page_when_authenticated()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->get('/');
        $response->assertStatus(200);
    }
    

}
