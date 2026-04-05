import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { pokemonService } from '@/lib/services/pokemon.service';
import { pokemonKeys } from '@/lib/query-keys';
import { PokemonListResponse } from '@/types/pokemon';

const LIMIT = 20;

interface UsePokemonListOptions {
  page: number;
  /**
   * Seed the cache for page 1 from SSR-fetched data, avoiding
   * a client-side waterfall on the initial render.
   */
  initialData?: PokemonListResponse;
}

/**
 * usePokemonList
 *
 * Abstracts all React Query logic for the Pokémon listing page.
 * Components stay clean — they only consume the hook's return values.
 *
 * keepPreviousData rationale (see UX note below):
 * While the next page is loading, React Query keeps the *previous* page's
 * data visible instead of switching to `undefined`. This prevents the grid
 * from blinking or collapsing between pages, making navigation feel instant.
 */
export function usePokemonList({ page, initialData }: UsePokemonListOptions) {
  const offset = (page - 1) * LIMIT;

  return useQuery({
    queryKey: pokemonKeys.list({ limit: LIMIT, offset }),
    queryFn: () => pokemonService.getPokemonList({ limit: LIMIT, offset }),
    // Only supply initialData when it matches the correct page (page 1 / offset 0).
    // Passing page-1 SSR data to later pages would seed the wrong cache entry.
    initialData: offset === 0 ? initialData : undefined,
    placeholderData: keepPreviousData,
  });
}

export { LIMIT };
