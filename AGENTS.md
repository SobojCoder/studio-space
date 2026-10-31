<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack facts that will trip you up

- Next.js 16.4.3, App Router (`src/app/`), React 19.3, TypeScript strict, Tailwind v4, Turbopack. Single package — no monorepo, no workspace config.
- **React Compiler is enabled** (`reactCompiler` in `next.config.ts`): don't add `useMemo`/`useCallback`/`memo`, and follow compiler rules (e.g. no ref access during render).
- `cacheComponents: true` and `partialPrefetching: true` are set — this uses the newer caching model. Consult `node_modules/next/dist/docs/` instead of assuming classic fetch-cache or `revalidate` semantics.
- **UI components are shadcn on Base UI, not Radix.** `components.json` uses style `base-nova`; primitives come from `@base-ui/react`. Add components with `npx shadcn add <name>`; don't hand-write Radix imports.
- `cn` is the `cn` npm package (not clsx + tailwind-merge): components do `import { cn } from "cn"`. `src/lib/utils.ts` merely re-exports it to satisfy the shadcn alias — don't reimplement it.

## Commands

- `npm run dev` — dev server (Turbopack); it rewrites the auto-generated block above, so don't delete that block.
- `npm run lint` — ESLint flat config (`eslint-config-next`).
- `npx tsc --noEmit` — typecheck; there is no `npm run typecheck` script.
- No test suite, no CI workflows, no env files exist yet. Don't invent prerequisites.

## Conventions

- Path alias: `@/*` → `./src/*`.
- Layouts/pages use **generated global types** — e.g. `LayoutProps<"/">` in `src/app/layout.tsx`. Use these (and `PageProps<...>`) instead of hand-declaring `params`/`searchParams` prop types.
- Tailwind v4 is CSS-first: theme tokens live in `src/app/globals.css` (`@theme inline`), loaded via the Turbopack rule in `next.config.ts`. There is no `tailwind.config.*`; dark mode is class-based (`.dark`).
- shadcn components live in `src/components/ui/`; config is in `components.json`.
