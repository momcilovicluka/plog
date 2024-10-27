<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    // Determine if the user can update the comment
    public function update(User $user, Comment $comment)
    {
        return $user->id === $comment->user_id ? Response::allow() : Response::deny('You do not own this comment.');
    }

    // Determine if the user can delete the comment
    public function delete(User $user, Comment $comment)
    {
        return $user->id === $comment->user_id || $user->id === $comment->post->user_id || $user->role === 'admin' ? Response::allow() : Response::deny('You are not authorized to delete this comment.');
    }
}
