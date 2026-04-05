'use client';

/**
 * Loading (Skeleton UI)
 * 
 * Next.js-provided `loading.tsx` for initial SSR or navigation 
 * between pages. Replicates the 20-card grid layout with placeholders.
 */
export default function Loading() {
  return (
    <main className="container mx-auto py-12 px-6">
      <header className="mb-12 text-center animate-pulse">
        <div className="h-10 w-64 bg-zinc-200 mx-auto mb-4 rounded-md"></div>
        <div className="h-6 w-80 bg-zinc-100 mx-auto rounded-md"></div>
      </header>

      <section>
        {/* Placeholder for Search Input and Pagination */}
        <div className="h-12 w-full bg-zinc-100 mb-8 rounded-md animate-pulse"></div>

        <div className="pokemon-grid p-4 opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="pokemon-card bg-zinc-50 border border-zinc-100 animate-pulse"
              style={{ height: '320px' }}
            >
              <div className="image-container bg-zinc-100 h-40 w-full mb-4 rounded-md"></div>
              <div className="h-6 w-3/4 bg-zinc-200 mb-2 rounded-md mx-auto"></div>
              <div className="h-4 w-1/2 bg-zinc-100 mb-4 rounded-md mx-auto"></div>
              <div className="h-8 w-2/3 bg-zinc-200 mt-auto rounded-md mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
