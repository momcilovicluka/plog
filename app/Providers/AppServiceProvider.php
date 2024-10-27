<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\Post;
use App\Policies\CommentPolicy;
use App\Policies\PostPolicy;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Post::class => PostPolicy::class,
        Comment::class => CommentPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        Vite::prefetch(concurrency: 3);
    }

    /**
     * Register the application's policies.
     */
    public function registerPolicies(): void
    {
        $gate = $this->app->make(Gate::class);

        foreach ($this->policies as $model => $policy) {
            $gate->policy($model, $policy);
        }
    }
}
