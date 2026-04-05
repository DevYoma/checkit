'use client';

import Link from 'next/link';

interface PokemonCardProps {
  name: string;
  id: string | number;
  imageUrl: string;
  url?: string;
}

/**
 * PokemonCard
 *
 * A reusable card component used for both listed Pokémon 
 * results and specific search results.
 */
export default function PokemonCard({ name, id, imageUrl, url }: PokemonCardProps) {
  return (
    <div key={name} className="pokemon-card">
      <div className="image-container">
        <img src={imageUrl} alt={name} loading="lazy" />
      </div>

      <h2 className="capitalize">{name}</h2>

      <span className="id-badge">ID: #{String(id)?.padStart(3, '0')}</span>

      {url && (
        <div className="url-text">
          <p title={url}>{url}</p>
        </div>
      )}

      <div className="card-actions" style={{ marginTop: '1rem' }}>
        <Link 
          href={`/pokemon/${name}`}
          className="view-details-btn"
          id={`view-details-${name}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
