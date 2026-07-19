# AGENTS.md

## Cursor Cloud specific instructions

### What this is
NORO Studio — a single-page **Next.js 15 (App Router)** frontend built with React 19,
TypeScript, Tailwind CSS v4, and shadcn/ui. It is **frontend-only**: there is no
backend, database, auth, or external API. The AI "generation" flow is a client-side
simulation (see `src/lib/generation.ts` and `src/components/studio/*`), so **no API
keys, secrets, or auxiliary services are required** to run, lint, build, or demo it.

Node.js 22 is available in the environment. The package manager is **npm**
(`package-lock.json` is committed).

### Commands
Standard scripts are defined in `package.json`; there is nothing custom to memorize:
- `npm run dev` — dev server (Turbopack) on http://localhost:3000
- `npm run lint` — ESLint (`eslint-config-next`)
- `npm run build` — production build (Turbopack)
- `npm start` — serve the production build (run `npm run build` first)

### Non-obvious notes
- Dev and build both use **Turbopack** (`next dev/build --turbopack`).
- The demo/"hello world" flow is: type a prompt in the Creation Console → pick a
  style/model → click **Generate**. The Live Preview shows a brief progress state
  (~3s) then a result card, and the item is appended to Recent Creations. This is
  fully client-side; nothing hits the network.
- The application code currently lives on the `cursor/noro-studio-homepage-91e4`
  branch (PR #2). The `main` branch only contains `README.md`, so `package.json`
  may not exist on a fresh checkout of `main` — the startup update script guards
  `npm install` accordingly.
