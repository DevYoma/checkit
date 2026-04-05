/**
 * Query Key Factory for Pokemon related queries.
 * 
 * Why this is useful:
 * 1.  Centralization: All keys are in one place, making them easy to find and manage.
 * 2.  Type Safety: Ensures that parameters like id or params are correctly typed.
 * 3.  Maintainability: If you need to change a key, you only change it here.
 * 4.  Invalidation: Makes it easy to invalidate whole collections of keys (e.g. invalidate all pokemon lists).
 * 5.  Predictability: Consistent key naming across the app, avoiding bugs where keys don't match.
 */
export const pokemonKeys = {
  all: ['pokemon'] as const,
  lists: () => [...pokemonKeys.all, 'list'] as const,
  list: (params: { limit?: number; offset?: number }) => 
    [...pokemonKeys.lists(), params] as const,
  details: () => [...pokemonKeys.all, 'detail'] as const,
  detail: (idOrName: string | number) => 
    [...pokemonKeys.details(), idOrName] as const,
};
