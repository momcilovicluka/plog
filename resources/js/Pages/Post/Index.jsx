import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { posts = [] } = usePage().props;

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            {/* Navigation Bar (Reusing the same structure) */}
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                }
            >

                <div className="container mx-auto mt-8">
                    <h1 className="text-3xl font-bold mb-4">All Posts</h1>

                    {/* Display message when no posts are available */}
                    {posts.length === 0 ? (
                        <h2 className="text-lg text-gray-400">No posts available.</h2>
                    ) : (
                        <ul className="space-y-4">
                            {posts.map((post) => (
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
                            ))}
                        </ul>
                    )}
                </div>
            </AuthenticatedLayout>

        </div>
    );
}
