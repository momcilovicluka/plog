import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostList from '@/Pages/Post/PostList';

export default function Index() {
    const { posts = [] } = usePage().props;

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <AuthenticatedLayout>

                <div className="container mx-auto mt-8">
                    <h1 className="text-3xl font-bold mb-4">All Posts</h1>

                    <PostList posts={posts} />
                </div>
            </AuthenticatedLayout>

        </div>
    );
}
