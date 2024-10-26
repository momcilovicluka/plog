// Edit.jsx

import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostForm from '@/Pages/Post/PostForm';

export default function EditPost({ post }) {
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
                <PostForm 
                title={title} 
                setTitle={setTitle} 
                content={content} 
                setContent={setContent} 
                handleSubmit={handleSubmit} 
                errors={errors} 
            />
            </div>
        </AuthenticatedLayout>
    );
}
