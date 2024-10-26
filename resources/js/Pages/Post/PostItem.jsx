import React from 'react';
import { Link } from '@inertiajs/react';

export default function PostItem({ post }) {
    return (
        <li className="post-item bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 list-none">
            <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold text-blue-400">
                    {post.title}
                </h2>
                <p className="mt-2 text-gray-300">
                    {post.content.substring(0, 100)}...
                </p>
            </Link>
        </li>
    );
}