# PokéAPI Explorer

A production-ready Pokédex built with Next.js 14+ App Router, TypeScript, and TanStack Query.

🌐 **Live Demo:** [https://checkit-drab.vercel.app/](https://checkit-drab.vercel.app/)
📁 **GitHub:** [https://github.com/DevYoma/checkit](https://github.com/DevYoma/checkit)

---

## Getting Started (Project Setup)

```bash
git clone https://github.com/DevYoma/checkit.git
cd checkit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Preview

![Preview Image 1](image-1.png)
![Preview Image 2](image-2.png)

---

## Lighthouse Score

![Light house Home Page Image Result](image-5.png)
![Light house Detail Page Image Result](image-4.png)

---

## Key Features

- **Listing Page** — Server-side fetched Pokémon data, hydrated into React Query for client-side caching and updates.
- **Pagination** — URL-synced page state with smooth transitions using React Query.
- **Search** — Debounced, URL-driven search with conditional queries.
- **Detail Page** — Dynamic SSR page with SEO metadata and fast load times.

---

## Architecture & Technical Decisions

### 1. API Layer

I used my go-to **3-layer pattern**:

- **Service Layer** — pure API calls (`resource.service.ts`)
- **Hook Layer** — React Query (`useResource.ts`)
- **Component Layer** — consumes the hook

```ts
const { exposedHookData } = useResource()
```

I also made use of a **Query Key Factory** for cache consistency. I've seen codebases become really messy without a consistent way to track cache keys — especially when using React Query. Query keys ensure predictable invalidation and scaling.

> **Tradeoff:** Can be overkill for small apps, but you'll get to enjoy it when it clicks — it makes scaling much easier.

---

### 2. Home Page List

Used **Server Components** to fetch the initial Pokémon list and passed the data to the client via props. This is the common **hydration pattern** in Next.js — data on the server is taken over and controlled by data on the client.

**Benefit:** Helps with SEO and performance.

---

### 3. Reusable Component

Built a reusable `PokemonCard` component used in both the list and search result views.

All shared types are defined in `types/pokemon.types.ts` — no inline type definitions for reused shapes.

---

### 4. Pagination

- Used **offset-based** pagination from the PokéAPI
- Used **nuqs** for URL-synced page state

---

### 5. Detail Page

Dynamic route `/pokemon/[name]` using a **Server Component**:

- Fetched data on the server side for SEO and fast initial load
- Generated dynamic SEO tags using `generateMetadata`

---

### 6. Search

- **Debounced input** (300ms) synced with the URL via nuqs
- Search calls the direct endpoint by name
- Limited to **exact match** due to PokéAPI constraints (no partial match support)

---

### 7. States (Loading, Error, Empty)

- Used `loading.tsx` and `error.tsx` for **route-level states**
- Used **React Query states** (`isLoading`, `isError`) for client-side updates

---

### 8. Performance Optimizations

| Optimization | What | Why |
|---|---|---|
| `next/image` | Replaced all `<img>` tags | Automatic compression, lazy loading, no layout shift |
| `revalidate: 60` | Pokémon list fetch | Serves from cache, revalidates every 60s in background |
| `force-cache` | Pokémon detail fetch | Pokémon stats never change — permanent cache hit after first visit |
| `next/font/google` | Nunito font | Prevents layout shift (CLS) during font load |

---

### 9. Testing

- Used **Vitest** with **React Testing Library (RTL)**
- Tested `PokemonCard` UI rendering and `PokemonList` state

```bash
npm run test
```

---

## Trade-offs & Limitations

- **Search is exact-match only** — The PokéAPI does not support partial/fuzzy search. Searching "pika" won't return Pikachu; you need the full name.
- **Query Key Factory** — Adds a small layer of abstraction that can feel like overhead in a small app, but pays off significantly as the codebase scales.
- **No authentication** — The PokéAPI is fully public, so no auth layer was needed or implemented.
- **Styling** — Used SCSS over Tailwind to keep the setup minimal. The UI is clean but could be more polished with more time.

---

## What Would I Improve With 2 More Hours?

I would probably deploy to **Cloudflare Workers**, as I haven't done it before and it would be a great learning opportunity. I would also pay more attention to the **styling of the application** — the functionality is solid, but the UI could be more polished and visually impressive.
