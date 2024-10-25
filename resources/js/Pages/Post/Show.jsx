import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ShowPost({ auth, post }) {
    const isAuthenticated = auth.user !== null;

    const content = (
        <div className="container mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
            <Head title={post.title} />
            <h1 className="text-3xl font-bold mb-4 text-gray-200">{post.title}</h1>
            <p className="text-gray-300 mb-6">{post.content}</p>

            <h3 className="text-2xl font-semibold text-gray-200">Comments</h3>
            <ul className="space-y-4 mt-4">
                {post.comments.length === 0 ? (
                    <li className="text-gray-400">No comments yet.</li>
                ) : (
                    post.comments.map((comment) => (
                        <li key={comment.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <p className="text-gray-300">{comment.content}</p>
                            <p className="text-gray-500 text-sm mt-1">{comment.created_at}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );

    if (isAuthenticated) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {post.title}
                    </h2>
                }
            >
                {content}
            </AuthenticatedLayout>
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen text-gray-200 p-6">
            {content}
        </div>
    );
}
