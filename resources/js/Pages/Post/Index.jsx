import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostList from '@/Pages/Post/PostList';

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

                    <PostList posts={posts} />
                </div>
            </AuthenticatedLayout>

        </div>
    );
}
