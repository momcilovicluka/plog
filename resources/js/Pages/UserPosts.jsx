import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Pages/Navbar';


export default function UserPosts({ auth, user, posts }) {
    return (
        <div className="bg-gray-900 h-screen">
            <Navbar auth={auth} />
        <div className="container mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
            <Head title={`${user.username}'s Posts`} />
            <h1 className="text-3xl font-bold mb-4 text-gray-200">{user.name}'s Posts</h1>
            {posts.data.length === 0 ? (
                <p className="text-gray-400">No posts found.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.data.map((post) => (
                        <li
                        key={post.id}
                        className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        <Link href={`/posts/${post.id}`}>
                            <h2 className="text-xl font-semibold text-blue-400 hover:underline">
                                {post.title}
                            </h2>
                            <p className="mt-2 text-gray-300">
                                {post.content.substring(0, 100)}...
                            </p>
                        </Link>
                    </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
}
