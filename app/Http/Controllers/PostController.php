<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

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
}
