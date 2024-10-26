import React from 'react';
import { Link } from '@inertiajs/react';
import moment from 'moment';

export default function CommentItem({ comment, auth, post, handleDeleteComment }) {
    return (
        <li key={comment.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-gray-300">{comment.comment}</p>
            <p className="text-gray-500 text-sm mt-1">
                {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')} by{' '}
                <Link
                    href={route('users.posts', comment.user)}
                    className="text-blue-400 hover:text-blue-300"
                >
                    {comment.user.name}
                </Link>
            </p>
            {auth.user && (auth.user.id === comment.user_id || auth.user.id === post.user_id || auth.user.role === 'admin') && (
                <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-500 mt-2"
                >
                    Delete
                </button>
            )}
        </li>
    );
}
