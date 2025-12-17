# notion-movies-metadata

### Source scripts (in `src/scripts/`)

- `src/scripts/get-movie.ts` — CLI that calls the OMDB client directly. Usage:

```bash
npx ts-node src/scripts/get-movie.ts 'Toy Story 2' 1999
```

(First arg is the movie title; second optional arg is the year.)
