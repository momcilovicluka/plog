import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import Footer from '@/Pages/Common/Footer';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-100">
                            <h3 className="text-2xl font-bold text-blue-400 mb-4">Welcome, {user.name}!</h3>

                            <nav className="mb-6">
                                <ul className="flex space-x-4">
                                    <li>
                                        <Link href="/posts" className="text-blue-300 hover:underline">My Posts</Link>
                                    </li>
                                    <li>
                                        <Link href="/posts/create" className="text-blue-300 hover:underline">Create New Post</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </AuthenticatedLayout>
    );
}
