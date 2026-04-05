import { PokemonListResponse, PokemonDetail } from '../../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Service Layer (Fetch implementation).
 * Updated to use native `fetch` for Next.js Data Cache integration.
 */
export const pokemonService = {
  /**
   * getPokemonList (paginated)
   * Fetches a paginated list using Fetch.
   * Optimization: Caching for 60 seconds (Data Cache).
   */
  getPokemonList: async (params: { limit?: number; offset?: number } = {}): Promise<PokemonListResponse> => {
    const { limit = 20, offset = 0 } = params;
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  /**
   * getPokemonByNameOrId
   * Fetches detailed data.
   * Optimization: Full static cache (Data Cache).
   */
  getPokemonByNameOrId: async (idOrName: string | number): Promise<PokemonDetail> => {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
