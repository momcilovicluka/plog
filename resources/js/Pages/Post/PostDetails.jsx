import React from 'react';
import { Link } from '@inertiajs/react';
import moment from 'moment';

export default function PostDetails({ post }) {
    return (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg m-2'>
            <h1 className="text-3xl font-bold mb-4 text-gray-200">{post.title}</h1>
            <h3 className="font-bold mb-4 text-blue-300">
                <Link
                    href={route('users.posts', post.user)}
                    className="text-blue-400 hover:text-blue-300"
                >
                    {post.user.name}
                </Link>
                <p className='text-purple-700'>on {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')} </p>
            </h3>
            <p className="text-gray-300 mb-6">{post.content}</p>
        </div>
    );
}
