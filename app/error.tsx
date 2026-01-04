'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Runtime Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background text-foreground">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6 max-w-lg overflow-auto">
                <p className="font-mono text-sm text-red-500 text-left">
                    {error.message || 'Unknown error occurred'}
                </p>
                {error.stack && (
                    <pre className="text-xs text-text-secondary mt-2 text-left overflow-x-auto">
                        {error.stack}
                    </pre>
                )}
            </div>
            <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity"
            >
                <RefreshCcw className="w-5 h-5" />
                Try again
            </button>
        </div>
    );
}
