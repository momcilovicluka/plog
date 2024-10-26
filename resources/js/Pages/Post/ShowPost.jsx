import React from 'react';
import { useForm } from '@inertiajs/react';
import Navbar from '@/Pages/Common/Navbar';
import PostActions from '@/Pages/Post/PostActions';
import PostDetails from '@/Pages/Post/PostDetails';
import CommentForm from '@/Pages/Comment/CommentForm';
import CommentItem from '@/Pages/Comment/CommentItem';
import Footer from '@/Pages/Common/Footer';

export default function ShowPost({ auth, post }) {
    const isAuthenticated = auth.user !== null;

    const { delete: destroy } = useForm();

    const handleDeletePost = () => {
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
            <PostDetails post={post} />

            <h3 className="text-2xl font-semibold text-gray-200">Comments</h3>
            <CommentForm
                data={data}
                setData={setData}
                handleCommentSubmit={handleCommentSubmit}
                processing={processing}
            />
            <ul className="space-y-4 mt-4">
                {post.comments.length === 0 ? (
                    <li className="text-gray-400">No comments yet.</li>
                ) : (
                    post.comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            auth={auth}
                            post={post}
                            handleDeleteComment={handleDeleteComment}
                        />
                    ))
                )}
            </ul>
            <Footer />
        </div>
    );

    if (isAuthenticated) {
        return (
            <PostActions
                auth={auth}
                post={post}
                handleDeletePost={handleDeletePost}
                content={content}
            />
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen text-gray-200 p-6">
            <Navbar auth={auth} />
            {content}
        </div>
    );
}
