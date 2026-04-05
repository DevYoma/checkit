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
    <div className="search-container mb-6">
      <input
        type="search"
        placeholder="Search Pokémon by name or ID..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="search-input w-full p-2 border border-zinc-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-zinc-100"
        id="pokemon-search-input"
        aria-label="Search Pokémon"
      />
      {search && (
        <button 
          onClick={() => { setLocalValue(''); setSearch(null); }}
          className="mt-1 text-xs text-zinc-500 hover:text-zinc-900"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
