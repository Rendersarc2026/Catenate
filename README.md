# Catenate

Marketing site for Catenate — a distributor of bonding, sealing and construction
chemicals. Next.js App Router, TypeScript, Tailwind v4 and shadcn/ui.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Structure

| Path | What lives there |
| --- | --- |
| `src/app/globals.css` | Brand tokens, the shadcn semantic layer mapped onto them, and the handful of patterns Tailwind can't express as utilities (reveal, ticker, map dots, plus glyph, footer wordmark). |
| `src/data/catenate.ts` | Every string a visitor reads, plus the image sources. Edit copy here, not in components. |
| `src/components/ui/` | shadcn primitives. `button` carries the brand pill variants; `accordion` gained a `showIcon` escape hatch; `sheet` is raised above the sticky header and uses the navy scrim. |
| `src/components/site/` | One file per section, plus `arrow-button`, `reveal` and `row-accordion` shared between them. |

## Design system

Brand tokens are defined once on `:root` and re-exported through `@theme` so they
work as utilities (`bg-blue`, `text-ink`, `text-grey`, `rounded-block`, `ease-expo`,
`px-pad`). The shadcn semantic tokens — `--primary`, `--muted-foreground`, `--ring`
and friends — are aliased to the same palette, so any component added with
`npx shadcn@latest add …` inherits the brand without further work.

The page is a single light design; there is no dark mode.

## Before launch

- **Photography is placeholder.** Every image resolves to `picsum.photos` through
  the `images` map in `src/data/catenate.ts`. Swap that map and the
  `remotePatterns` entry in `next.config.ts` for the real asset host — until then
  the page has a hard external dependency for all imagery.
- **Contact and legal details are placeholder**: `+000 0000 0000`,
  `Trade licence 000000`, the `TL-000000` certificate, and the head-office address
  in `company` (`src/data/catenate.ts`).
- **"13 brands represented"** in the hero stat bar isn't substantiated anywhere
  else on the page — the site names five principals and twenty-eight families.
