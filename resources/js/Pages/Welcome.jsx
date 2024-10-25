// resources/js/Pages/Welcome.jsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Pages/Navbar';

export default function Welcome({ auth, posts = [] }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="My Blog" />
            <div className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                {/* Main content */}
                <div className="relative flex flex-col items-center justify-center min-h-screen px-6 selection:bg-blue-600 selection:text-white">
                    <Navbar auth={auth} />

                    <main className="flex flex-col items-center space-y-6 mt-10">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
                            Welcome to Plog
                        </h1>
                        <h3 > a blog sharing platform</h3>
                        <p className="text-lg text-center max-w-2xl">
                            Discover articles on the latest trends in technology, programming, and web development. Dive into insightful posts written by industry experts and enthusiasts.
                        </p>

                        {/* Blog Post Cards */}
                        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        <Link href={`/posts/${post.id}`}>
                                            <h2 className="text-xl font-semibold text-blue-400 hover:underline">
                                                {post.title}
                                            </h2>
                                            <p className="mt-2 text-gray-300">
                                                {post.content.substring(0, 100)}...
                                            </p>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    No posts available at the moment.
                                </p>
                            )}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="mt-16 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} All rights reserved. Made with ❤️ by{' '}
                            <a
                                href="https://www.github.com/momcilovicluka"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Luka
                            </a>{' '}
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
