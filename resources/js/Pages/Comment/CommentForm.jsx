import React from 'react';

export default function CommentForm({ data, setData, handleCommentSubmit, processing }) {
    return (
        <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4 bg-gray-800 p-4 rounded-lg">
            <textarea
                value={data.comment}
                onChange={(e) => setData('comment', e.target.value)}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
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
    );
}
