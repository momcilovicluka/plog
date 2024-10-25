<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
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

    public function store(Request $request, $postId)
    {
        // Validate the incoming request
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        // Find the post by ID
        $post = Post::findOrFail($postId);

        // Create a new comment instance
        $comment = new Comment();
        $comment->comment = $request->input('comment');
        $comment->post_id = $post->id;
        $comment->user_id = Auth::check() ? Auth::id() : -1; // Set user_id for authenticated users

        // Save the comment
        $comment->save();

        // Redirect back to the post with a success message
        return redirect()->route('posts.show', $postId)->with('success', 'Comment added successfully!');
    }
}
