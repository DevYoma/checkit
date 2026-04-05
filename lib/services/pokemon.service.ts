import { api } from '../api-client';
import { PokemonListResponse, PokemonDetail } from '../../types/pokemon';

/**
 * Service Layer (Fetch implementation).
 * Uses simplified fetch instance with base URL.
 */
export const pokemonService = {
  /**
   * getPokemonList (paginated)
   * Fetches a paginated list using Fetch.
   */
  getPokemonList: async (params: { limit?: number; offset?: number } = {}): Promise<PokemonListResponse> => {
    const { limit = 20, offset = 0 } = params;
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  /**
   * getPokemonByNameOrId
   * Fetches detailed data.
   */
  getPokemonByNameOrId: async (idOrName: string | number): Promise<PokemonDetail> => {
    const response = await api.get(`/pokemon/${idOrName}`);
    return response.data;
  },



};
