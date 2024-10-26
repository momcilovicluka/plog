import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <header className="w-full max-w-4xl mx-auto px-4 py-8 flex justify-between items-center">

            <div className="flex items-center space-x-3 text-2xl font-semibold tracking-wide">
                <Link
                    href="/"
                    className="text-blue-600 dark:text-blue-400 hover:opacity-75 transition duration-300"
                >
                    Plog
                </Link>
            </div>

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
    );
}