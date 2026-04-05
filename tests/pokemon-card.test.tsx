import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonCard from '@/components/pokemon/pokemon-card';

const mockPokemon = {
  name: 'pikachu',
  id: 25,
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  url: 'https://pokeapi.co/api/v2/pokemon/25/'
};

describe('PokemonCard', () => {
  it('renders the PokemonCard with its name, ID, and image', () => {
    render(<PokemonCard {...mockPokemon} />);

    // Assert Name
    expect(screen.getByText('pikachu')).toBeInTheDocument();

    // Assert Metadata (Formatted ID)
    expect(screen.getByText('ID: #025')).toBeInTheDocument();

    // Assert Image and Alt Text
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'pikachu');
    expect(image).toHaveAttribute('src', mockPokemon.imageUrl);
  });
});
