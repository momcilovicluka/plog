<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function userPosts(User $user)
    {
        // Load the user's posts with pagination, eager-loading relationships if needed
        $posts = $user->posts()->latest()->paginate(10);

        // Return the view with Inertia
        return Inertia::render('UserPosts', [
            'user' => $user,
            'posts' => $posts,
        ]);
    }
}
