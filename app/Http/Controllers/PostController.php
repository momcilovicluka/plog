<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        try {
            $userid = Auth::id();

            if ($userid) {
                $posts = Post::where('user_id', $userid)->get();
            } else {
                $posts = Post::all();
            }
        } catch (\Exception $e) {
            $posts = Post::all();
        }

        return Inertia::render('Post/Index', [
            'posts' => $posts,
        ]);
    }

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
        $post = Post::with(['comments.user', 'user'])->findOrFail($id);

        return Inertia::render('Post/ShowPost', [
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

    public function destroy($id): RedirectResponse
    {
        $post = Post::findOrFail($id);

        Gate::authorize('delete', $post);

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);

        Gate::authorize('update', $post);

        return Inertia::render('Post/EditPost', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        Gate::authorize('update', $post);

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validatedData);

        return redirect()->route('posts.show', $post->id)
            ->with('success', 'Post updated successfully.');
    }
}
