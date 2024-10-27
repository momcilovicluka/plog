<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created()
    {
        $user = User::create([
            'name' => 'Nebojsa Jozef',
            'email' => 'nebojsa@example.com',
            'password' => 'password123',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'nebojsa@example.com',
            'name' => 'Nebojsa Jozef',
        ]);
    }

    public function test_user_has_posts()
    {
        $user = User::factory()->create();
        $post = $user->posts()->create([
            'title' => 'Sample Post',
            'content' => 'This is a sample post body.',
        ]);

        $this->assertCount(1, $user->posts);
        $this->assertEquals('Sample Post', $user->posts()->first()->title);
    }

    public function test_password_is_hashed()
    {
        $user = User::create([
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'password' => 'password123',
        ]);

        $this->assertNotEquals('password123', $user->password);
    }

    public function test_user_creation_fails_without_email()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        User::create([
            'name' => 'Invalid User',
            'password' => 'password123',
        ]);
    }

    public function test_user_hidden_attributes()
    {
        $user = User::create([
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'password' => 'password123',
        ]);

        $this->assertArrayNotHasKey('password', $user->toArray());
        $this->assertArrayHasKey('email', $user->toArray());
    }
}
