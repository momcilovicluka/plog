// resources/js/Components/CreatePostForm.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Add this line

export default function CreatePostForm() {
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
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Create a New Post</h3>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md shadow-sm bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter post title"
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
                    className="mt-1 block w-full rounded-md shadow-sm bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Write your post content here..."
                />
                {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                    Create Post
                </button>
            </div>
        </form>
    );
}
