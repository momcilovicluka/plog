import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import moment from 'moment';
import Navbar from '@/Pages/Navbar';

export default function ShowPost({ auth, post }) {
    const isAuthenticated = auth.user !== null;

    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(route('posts.destroy', post.id));
        }
    };

    const handleDeleteComment = (commentId) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            destroy(route('comments.destroy', commentId), {
                onSuccess: () => {
                    console.log('Comment deleted successfully');
                },
                onError: (errors) => {
                    console.error('Error deleting comment:', errors);
                }
            });
        }
    };

    const { data, setData, post: submitComment, processing } = useForm({
        comment: '',
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        submitComment(route('comments.store', post.id), {
            onSuccess: () => {
                setData({ comment: '' }); // Reset the comment input
            },
            onError: (errors) => {
                console.error('Error adding comment:', errors);
            }
        });
    };

    const content = (
        <div className="container mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-200">{post.title}</h1>
            <p className="text-gray-300 mb-6">{post.content}</p>

            <h3 className="text-2xl font-semibold text-gray-200">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    rows="4"
                    className="w-full p-2 text-gray-900 rounded bg-gray-200"
                    placeholder="Add a comment..."
                    required
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {processing ? 'Adding...' : 'Add Comment'}
                </button>
            </form>
            <ul className="space-y-4 mt-4">
                {post.comments.length === 0 ? (
                    <li className="text-gray-400">No comments yet.</li>
                ) : (
                    post.comments.map((comment) => (
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
                            {(auth.user && (auth.user.id === comment.user_id || auth.user.id === post.user_id || auth.user.role === 'admin')) && (
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="text-red-600 hover:text-red-500 mt-2"
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );

    if (isAuthenticated) {
        return (
            <AuthenticatedLayout>
                {auth.user && (
    <div className="mt-4 flex justify-center space-x-4">
        {/* Show Delete button for both admin and post owner */}
        {(auth.user.role === 'admin' || auth.user.id === post.user_id) && (
            <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete Post
            </button>
        )}
        {/* Show Edit button only for the post owner */}
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

    return (
        <div className="bg-gray-800 min-h-screen text-gray-200 p-6">
            <Navbar auth={auth} />
            {content}
        </div>
    );
}
