<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        Gate::authorize('delete', $comment);

        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully.');
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
