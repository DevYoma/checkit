import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import PokemonList from '@/components/pokemon/pokemon-list';

function renderWithQuery(ui: React.ReactElement, searchParams = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <NuqsTestingAdapter searchParams={searchParams}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </NuqsTestingAdapter>
  );
}

const mockData = {
  count: 1,
  next: null,
  previous: null,
  results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
};

describe('PokemonList', () => {
  it('renders a Pokémon card when list data is present', () => {
    renderWithQuery(<PokemonList initialData={mockData} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    renderWithQuery(<PokemonList initialData={mockData} />);
    expect(screen.getByPlaceholderText(/search by name or id/i)).toBeInTheDocument();
  });
});
