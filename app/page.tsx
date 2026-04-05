import { Suspense } from 'react';
import { pokemonService } from '@/lib/services/pokemon.service';
import PokemonList from '@/components/pokemon/pokemon-list';

/**
 * Home (Server Component)
 *
 * SSR fetches page 1 data once at build/request time.
 * The result is passed as `initialData` to seed the React Query cache,
 * so the client renders instantly without a loading spinner on first paint.
 *
 * PokemonList is wrapped in <Suspense> because it uses `useSearchParams()`,
 * which opts the component into dynamic rendering. Suspense prevents the
 * server from blocking the entire page while waiting for client-side params.
 */
export default async function Home() {
  const initialData = await pokemonService.getPokemonList({ limit: 20, offset: 0 });

  return (
    <main className="container mx-auto py-12 px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          Gotta Catch &apos;Em All
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          The PokéAPI Explorer, revalidated every 60 seconds.
        </p>
      </header>

      <Suspense fallback={<p>Loading Pokédex…</p>}>
        <PokemonList initialData={initialData} />
      </Suspense>
    </main>
  );
}
