<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
     // Determine if the user can update the post
     public function update(User $user, Post $post)
     {
         return ($user->id === $post->user_id || $user->role === 'admin') ? Response::allow() : Response::deny('You do not own this post.');
     }
 
     // Determine if the user can delete the post
     public function delete(User $user, Post $post)
     {
         return ($user->id === $post->user_id || $user->role === 'admin') ? Response::allow() : Response::deny('You do not own this post.');
     }

     /**
 * Perform pre-authorization checks.
 */
public function before(User $user, string $ability): bool|null
{
    if ($user->role === 'admin') {
        return true;
    }
 
    return null;
}
}
