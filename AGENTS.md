# AGENTS.md — optraze-web

Guidance for AI coding agents (Claude Code, Greptile, Cursor, Copilot, etc.) working in this repository.

## What this repo is

Optraze's public marketing landing page (the company site, distinct from `convomem-web`, which is the ConvoMem product's own marketing/docs/blog site).

Stack: **TanStack Start** (full-stack React, SSR) + TanStack Router (file-based, `tsr generate`) + Tailwind 4 + Base UI + `react-three-fiber`/`three` (3D hero visuals) + Supabase JS client (likely for a contact/waitlist form — verify against `src/lib/` before assuming) + Bun as the runtime/package manager + Biome for lint/format.

## Structure

```
src/
├── routes/            # currently just index + __root — this is a single-page site, not a multi-section one
├── components/         # Hero, HowItWorks, Faq, FinalCTA, Footer, ConvoMem.tsx (product-highlight section), fx/backdrop (visual effects)
├── integrations/tanstack-query/
├── lib/
└── router.tsx, routeTree.gen.ts   # generated, never hand-edit
```

Unlike `convomem-web`, there's no `content/` MDX directory here — this site has no blog/docs/changelog, just page sections composed in `components/`.

## Commands

```bash
bun install
bun run dev            # vite dev --port 3000
bun run build
bun run og              # bun run scripts/generate-og.tsx
bun run generate-routes  # tsr generate — run after adding/removing a route file
bun run check           # biome check
bun test                 # vitest run
```

## Conventions

- **Bun + Biome**, same as `convomem-web` — don't suggest npm/yarn/ESLint/Prettier.
- `routeTree.gen.ts` is generated (`bun run generate-routes`) — never hand-edit.
- This is a single-page marketing site composed of section components (`Hero`, `HowItWorks`, `Faq`, `FinalCTA`, ...) rendered from the one `index.tsx` route — a new section is a new component in `src/components/`, added to that composition, not a new route.
- 3D/visual effects (`react-three-fiber`, `three`, `fx/`, `backdrop/`) are purely decorative — keep them isolated from content/data logic, and be mindful of perf (this is a first-impression landing page; a heavy 3D scene blocking initial render is a real regression).
- If a Supabase call is added (contact form, waitlist signup), it should use the anon/public key client-side only — no service-role key ever belongs in this repo.

## Workflow

1. New section → new component under `src/components/`, composed into the page — check the existing sections' structure/animation patterns (`motion`) before adding a new one.
2. Run `bun run generate-routes` if you touch anything under `src/routes/`.
3. Run `bun run check` and `bun test` before considering a change done.
4. No customer data, memory content, or product API credentials belong in this repo — it's a public, unauthenticated marketing page.
