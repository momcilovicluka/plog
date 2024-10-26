// resources/js/Pages/Welcome.jsx

import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Pages/Common/Navbar';
import Footer from '@/Pages/Common/Footer';
import PostItem from './Post/PostItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Welcome({ auth, posts = [] }) {
    const content = (
        <>
            <Head title="My Blog" />
            <div className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">

                <div className="relative flex flex-col items-center justify-center min-h-screen px-6 selection:bg-blue-600 selection:text-white">
                {auth.user ? null : <Navbar auth={auth} />}

                    <main className="flex flex-col items-center space-y-6 mt-10">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
                            Welcome to Plog
                        </h1>
                        <h3 > a blog sharing platform</h3>
                        <p className="text-lg text-center max-w-2xl">
                            Discover articles on the latest trends in technology, programming, and web development. Dive into insightful posts written by industry experts and enthusiasts.
                        </p>

                        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostItem post={post} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    No posts available at the moment.
                                </p>
                            )}
                        </div>
                    </main>

                    <Footer/>
                </div>
            </div>
        </>
    );

    return auth.user ? (
        <AuthenticatedLayout>
            {content}
        </AuthenticatedLayout>
    ) : (
        content
    );
}
