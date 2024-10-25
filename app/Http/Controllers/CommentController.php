<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function destroy($id)
    {
        // Retrieve the comment by ID
        $comment = Comment::findOrFail($id);
        
        // Check if the authenticated user is the owner of the comment or the owner of the post
        if (Auth::user()->id === $comment->user_id || Auth::user()->id === $comment->post->user_id) {
            // Delete the comment
            $comment->delete();

            return redirect()->back()->with('success', 'Comment deleted successfully.');
        }

        return redirect()->back()->with('error', 'You are not authorized to delete this comment.');
    }
}
