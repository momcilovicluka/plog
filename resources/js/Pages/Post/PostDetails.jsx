import React from 'react';
import { Link } from '@inertiajs/react';

export default function PostDetails({ post }) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-200">{post.title}</h1>
            <h3 className="font-bold mb-4 text-blue-300">
                <Link
                    href={route('users.posts', post.user)}
                    className="text-blue-400 hover:text-blue-300"
                >
                    {post.user.name}
                </Link>
            </h3>
            <p className="text-gray-300 mb-6">{post.content}</p>
        </div>
    );
}
