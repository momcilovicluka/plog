import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-16 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
            <p>
                Copyright &copy; {new Date().getFullYear()} All rights reserved. Made with ❤️ by{' '}
                <a
                    href="https://www.github.com/momcilovicluka"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Luka
                </a>{' '}
            </p>
        </footer>
    );
}
