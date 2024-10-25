import React from 'react';

export default function BlogPostCard({ post }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{post.content}</p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Posted on {new Date(post.created_at).toLocaleDateString()}
            </div>
        </div>
    );
}
