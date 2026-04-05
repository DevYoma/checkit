'use client';

import Link from 'next/link';
import Image from 'next/image';

interface PokemonCardProps {
  name: string;
  id: string | number;
  imageUrl: string;
  url?: string;
  priority?: boolean;
}

/**
 * PokemonCard
 * Optimized with next/image.
 */
export default function PokemonCard({ name, id, imageUrl, url, priority = false }: PokemonCardProps) {
  return (
    <div key={name} className="pokemon-card group">
      <div className="image-container relative h-48 w-full">
        <Image 
          src={imageUrl} 
          alt={name} 
          width={200}
          height={200}
          priority={priority}
          className="object-contain mx-auto"
          // Graceful fallback would typically be handled via onError or a placeholder
          // but next/image doesn't show a broken icon by default if configuration is correct.
          unoptimized={imageUrl.startsWith('http')} // PokéAPI images are sometimes external SVGs/PNGs not in local assets
        />
      </div>

      <h2 className="capitalize font-bold text-center mt-4">{name}</h2>

      <span className="id-badge block text-center text-zinc-400 text-sm">
        ID: #{String(id)?.padStart(3, '0')}
      </span>

      {url && (
        <div className="url-text hidden md:block mt-2">
          <p className="text-[10px] text-zinc-300 truncate" title={url}>
            {url}
          </p>
        </div>
      )}

      <div className="card-actions mt-6">
        <Link 
          href={`/pokemon/${name}`}
          className="view-details-btn block text-center py-2 bg-zinc-900 text-white rounded hover:bg-zinc-700 transition"
          id={`view-details-${name}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
