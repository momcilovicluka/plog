import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, posts = [] }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="My Blog" />
            <div className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                {/* Main content */}
                <div className="relative flex flex-col items-center justify-center min-h-screen px-6 selection:bg-blue-600 selection:text-white">
                    <header className="w-full max-w-4xl mx-auto px-4 py-8 flex justify-between items-center">
                        {/* Logo or Title */}
                        <div className="flex items-center space-x-3 text-2xl font-semibold tracking-wide">
                            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:opacity-75 transition duration-300">
                                MyBlog
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                    </header>

                    <main className="flex flex-col items-center space-y-6 mt-10">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">Welcome to My Blog</h1>
                        <p className="text-lg text-center max-w-2xl">Discover articles on the latest trends in technology, programming, and web development. Dive into insightful posts written by industry experts and enthusiasts.</p>

                        {/* Blog Post Cards */}
                        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.length > 0 ? (
                                posts.map((post) => (
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
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">No posts available at the moment.</p>
                            )}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="mt-16 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Made with ❤️ by <a href="https://www.github.com/momcilovicluka" className="text-blue-600 dark:text-blue-400 hover:underline">Luka</a> All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
