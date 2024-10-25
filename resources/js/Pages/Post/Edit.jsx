// Edit.jsx

import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ post }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const { errors } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a PUT request to update the post
        Inertia.put(route('posts.update', post.id), { title, content });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${post.title}`} />

            <div className="container mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-200">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-white">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Update Post
                        </button>
                        <Link
                            href={route('posts.show', post.id)}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
