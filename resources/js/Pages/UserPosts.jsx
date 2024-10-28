import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Pages/Common/Navbar';
import PostList from './Post/PostList';
import Footer from '@/Pages/Common/Footer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function UserPosts({ auth, user, posts }) {
    const content = (
        <div className="bg-gray-900 min-h-screen">
            {auth.user ? null : <Navbar auth={auth} />}
            <div className="container mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
                <Head title={`${user.name}'s Posts`} />
                <h1 className="text-3xl font-bold mb-4 text-gray-200">{user.name}'s Posts</h1>
                <PostList posts={posts.data} />
            </div>
            <Footer/>
        </div>
    );

    return auth.user ? (
        <AuthenticatedLayout>
            {content}
        </AuthenticatedLayout>
    ) : (
        content
    );
}
