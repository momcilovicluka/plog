<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function userPosts(User $user)
    {
        $posts = $user->posts()->latest()->paginate(10);

        return Inertia::render('UserPosts', [
            'user' => $user,
            'posts' => $posts,
        ]);
    }
}
