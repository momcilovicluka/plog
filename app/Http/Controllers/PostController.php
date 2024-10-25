<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    // List all posts
    public function index(): Response
    {
        try {
            $userid = Auth::id();

            // If the user is authenticated, get only their posts
            if ($userid) {
                $posts = Post::where('user_id', $userid)->get();
            } else {
                // If not authenticated, get all posts
                $posts = Post::all();
            }
        } catch (\Exception $e) {
            // In case of any errors, get all posts as a fallback
            $posts = Post::all();
        }

        return Inertia::render('Post/Index', [
            'posts' => $posts,
        ]);
    }

    // Show the form to create a new post
    public function create(): Response
    {
        return Inertia::render('Post/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Post::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created successfully!');
    }

    public function show(int $id): Response
    {
        $post = Post::with('comments')->findOrFail($id);

        return Inertia::render('Post/Show', [
            'post' => $post,
        ]);
    }

    public function showAll(): Response
    {
        return Inertia::render(
            'Dashboard',
            [
                'posts' => Post::all(),
                'users' => User::all(),
            ]
        );
    }

    public function all()
    {
        // Fetch all users using the User model
        $posts = Post::all();
        return response()->json($posts);
    }

    public function destroy($id): RedirectResponse
    {
        $post = Post::findOrFail($id);

        // Check if the authenticated user is the owner of the post
        if ($post->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // Delete the post
        $post->delete();

        // Redirect back to the posts index with a success message
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }

    public function edit($id)
{
    $post = Post::findOrFail($id);
    $user = Auth::user();

    // Check if the authenticated user is the owner of the post
    if ($post->user_id !== $user->id) {
        abort(403, 'Unauthorized action.');
    }

    // Return the edit view with the post data
    return Inertia::render('Post/Edit', [
        'post' => $post,
    ]);
}

public function update(Request $request, $id)
{
    $post = Post::findOrFail($id);
    $user = Auth::user();

    // Check if the authenticated user is the owner of the post
    if ($post->user_id !== $user->id) {
        abort(403, 'Unauthorized action.');
    }

    // Validate the incoming request data
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    // Update the post with the validated data
    $post->update($validatedData);

    // Redirect back to the post view or a success page
    return redirect()->route('posts.show', $post->id)
        ->with('success', 'Post updated successfully.');
}
}
