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
| `src/components/site/` | One file per section, plus `arrow-button`, `reveal`, `row-accordion` and `hero-backdrop` shared between them. |
| `src/app/not-found.tsx` | Branded 404, carrying the same header, backdrop and footer. |

## Design system

Brand tokens are defined once on `:root` and re-exported through `@theme` so they
work as utilities (`bg-blue`, `text-ink`, `text-grey`, `rounded-block`, `ease-expo`).
The shadcn semantic tokens — `--primary`, `--muted-foreground`, `--ring` and friends
— are aliased to the same palette, so any component added with
`npx shadcn@latest add …` inherits the brand without further work.

The page is a single light design; there is no dark mode.

## Layout

Sections are full-bleed so their backgrounds reach the viewport edge, while the
content inside sits in a centred column capped at `--content-max`. That is handled
by `.section` and the `.content-pad` utility, so no section needs its own wrapper
element. `--section-pad` sets the minimum gutter on narrow screens.

The layout is responsive from 320px up, verified for horizontal overflow at ten
widths. The nav collapses to a hamburger at 960px and the mega menu switches to
its stacked layout at the same breakpoint. Section anchors carry
`scroll-margin-top` so in-page links clear the sticky header.

## Hero

The hero background is drawn, not photographed — see
`src/components/site/hero-backdrop.tsx`. It is an inline SVG: a navy field lit warm
from the top left, a technical grid, and a sectioned system build-up echoing the
substrate/primer/membrane/protection courses the company specifies. Nothing is
fetched, so it costs no request and needs no licence. Swap the component for an
`<Image>` if real photography arrives.

## Before launch

- **Photography is placeholder.** The industry, project and contact-card images
  resolve to `picsum.photos` through the `images` map in `src/data/catenate.ts`.
  Swap that map and the `remotePatterns` entry in `next.config.ts` for the real
  asset host. (The hero and page backdrop no longer fetch anything.)
- **Contact and legal details are placeholder**: `+000 0000 0000`,
  `Trade licence 000000`, the `TL-000000` certificate, and the head-office address
  in `company` (`src/data/catenate.ts`).
- **"13 brands represented"** in the hero stat bar isn't substantiated anywhere
  else on the page — the site names five principals and twenty-eight families.
