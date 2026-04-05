import { useQuery } from '@tanstack/react-query';
import { pokemonService } from '@/lib/services/pokemon.service';
import { pokemonKeys } from '@/lib/query-keys';

/**
 * usePokemonSearch
 *
 * Conditional hook that fetches a single Pokémon by name or ID.
 * It remains idle (`enabled: false`) unless a search term is provided.
 */
export function usePokemonSearch(query: string) {
  const normalizedQuery = query.toLowerCase().trim();

  return useQuery({
    queryKey: pokemonKeys.detail(normalizedQuery),
    queryFn: () => pokemonService.getPokemonByNameOrId(normalizedQuery),
    enabled: !!normalizedQuery,
    retry: false, // Prevents multiple retries on a 404 search
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
