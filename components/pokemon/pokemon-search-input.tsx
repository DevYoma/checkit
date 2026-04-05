'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { useEffect, useState } from 'react';

/**
 * PokemonSearchInput
 *
 * This component manages its own local state for instant user feedback,
 * but debounces the URL sync via `nuqs` after 300ms.
 */
export default function PokemonSearchInput() {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false, history: 'push' })
  );

  const [localValue, setLocalValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localValue || null);
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, setSearch]);

  return (
    <div className="search-container mb-12 max-w-6xl mx-auto px-4">
      <input
        type="search"
        placeholder="Search by name or ID..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="search-input w-full p-8 text-2xl border-2 border-zinc-100 rounded-[2rem] shadow-xl shadow-zinc-100 focus:outline-none focus:ring-8 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all placeholder:text-zinc-300 font-light"
        id="pokemon-search-input"
        aria-label="Search Pokémon"
      />
      {search && (
        <button 
          onClick={() => { setLocalValue(''); setSearch(null); }}
          className="mt-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mx-auto"
        >
          ✕ Clear Current Search
        </button>
      )}
    </div>
  );
}
