import React from 'react';
import PostItem from './PostItem'; // Adjust the path as needed

export default function PostList({ posts }) {
    return (
        posts.length === 0 ? (
            <h2 className="text-lg text-gray-400">No posts available.</h2>
        ) : (
            <ul className="space-y-4">
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        )
    );
}
