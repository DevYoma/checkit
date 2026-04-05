import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { pokemonService } from '@/lib/services/pokemon.service';

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  try {
    const pokemon = await pokemonService.getPokemonByNameOrId(name);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imageUrl = pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.front_default;

    return {
      title: `${capitalizedName} | Pokémon`,
      description: `Details about ${capitalizedName}, its base experience being ${pokemon.base_experience} and its primary types being ${pokemon.types.map(t => t.type.name).join(', ')}.`,
      openGraph: {
        images: [{ url: imageUrl }],
      },
    };
  } catch {
    return { title: 'Pokémon Not Found' };
  }
}

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;

  let pokemon;
  try {
    pokemon = await pokemonService.getPokemonByNameOrId(name);
  } catch (error) {
    console.error('Failed to fetch pokemon:', error);
    notFound();
  }

  const imageUrl = pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <main className="container p-6">
      <nav className="mb-6">
        <Link href="/" className="back-link inline-block py-2 text-blue-600 hover:underline">
          ← Back to list
        </Link>
      </nav>

      <article className="pokemon-detail">
        <header className="mb-8">
          <h1 className="capitalize text-4xl font-bold">{pokemon.name}</h1>
          <p className="text-zinc-500">ID: #{String(pokemon.id).padStart(3, '0')}</p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div className="image-wrapper bg-zinc-100 rounded-lg p-8 relative h-[400px] w-full">
            <Image 
              src={imageUrl} 
              alt={pokemon.name} 
              fill
              priority={true} // Above-the-fold image for detail page
              className="object-contain p-4"
              unoptimized={true}
            />
          </div>

          <div className="stats-info space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Metadata</h2>
              <ul className="space-y-2">
                <li><strong>Height:</strong> {pokemon.height / 10} m</li>
                <li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
                <li><strong>Base Experience:</strong> {pokemon.base_experience}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((t) => (
                  <span key={t.type.name} className="px-3 py-1 bg-zinc-200 rounded capitalize">
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside capitalize">
                {pokemon.abilities.map((a) => (
                  <li key={a.ability.name}>
                    {a.ability.name} {a.is_hidden && <span className="text-xs text-zinc-400 font-normal">(Hidden)</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
