import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostForm from '@/Pages/Post/PostForm';
import Footer from '@/Pages/Common/Footer';

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
                setTitle('');
                setContent('');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4 text-blue-400">Create a New Post</h1>
                <PostForm 
                title={title} 
                setTitle={setTitle} 
                content={content} 
                setContent={setContent} 
                handleSubmit={handleSubmit} 
                errors={errors} 
            />
            </div><Footer />
        </AuthenticatedLayout>
    );
}
