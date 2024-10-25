import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/posts', {
            title,
            content,
        }, {
            onError: (error) => setErrors(error),
            onSuccess: () => {
                // Clear the form on success
                setTitle('');
                setContent('');
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4 text-blue-400">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-md">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
