<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if (Auth::user()->id === $comment->user_id || Auth::user()->id === $comment->post->user_id) {
            $comment->delete();

            return redirect()->back()->with('success', 'Comment deleted successfully.');
        }

        return redirect()->back()->with('error', 'You are not authorized to delete this comment.');
    }

    public function store(Request $request, $postId)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        $post = Post::findOrFail($postId);

        $comment = new Comment;
        $comment->comment = $request->input('comment');
        $comment->post_id = $post->id;
        $comment->user_id = Auth::check() ? Auth::id() : -1;

        $comment->save();

        return redirect()->route('posts.show', $postId)->with('success', 'Comment added successfully!');
    }
}
