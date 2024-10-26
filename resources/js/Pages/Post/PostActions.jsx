import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PostActions({ auth, post, handleDeletePost, content }) {
    return (
        <AuthenticatedLayout>
            {auth.user && (
                <div className="mt-4 flex justify-center space-x-4">
                    {(auth.user.role === 'admin' || auth.user.id === post.user_id) && (
                        <button
                            onClick={handleDeletePost}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete Post
                        </button>
                    )}
                    {auth.user.id === post.user_id && (
                        <Link
                            href={route('posts.edit', post.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit Post
                        </Link>
                    )}
                </div>
            )}
            {content}
        </AuthenticatedLayout>
    );
}
