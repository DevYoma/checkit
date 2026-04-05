'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error
 * 
 * Standard Next.js error component. Logs the error 
 * and provides a retry (reset) button.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error for observability
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-24 text-center">
      <h2 className="text-2xl font-bold text-zinc-900 mb-4">Something went wrong!</h2>
      <p className="text-zinc-500 mb-8 max-w-md mx-auto">
        {error.message || "An unexpected error occurred while fetching Pokémon data."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-zinc-900 text-white rounded-md font-semibold hover:bg-zinc-700 transition"
      >
        Try again
      </button>

      <div className="mt-8 text-xs text-zinc-400">
        Error ID: {error.digest || 'Internal client error'}
      </div>
    </div>
  );
}
