<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Models\Post;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'posts' => Post::all(),
    ]);
});

Route::middleware('auth')->group(function () {
    Route::prefix('/profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::get(
        '/dashboard',
        [PostController::class, 'showAll']
    )->name('dashboard');

    Route::prefix('/posts')->name('posts.')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::get('/create', [PostController::class, 'create'])->name('create');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::delete('/{id}', [PostController::class, 'destroy'])->name('destroy');
        Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('edit');
        Route::put('/posts/{id}', [PostController::class, 'update'])->name('update');
    });
});

Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show');

require __DIR__ . '/auth.php';
