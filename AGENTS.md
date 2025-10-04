# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with `main.tsx` bootstrapping the React app and `App.tsx` wiring routes. UI building blocks sit in `src/components/`, while page-level views belong in `src/pages/`. Shared logic is split across `src/lib/`, `src/utils/`, and `src/constants/`; design tokens live in `src/theme.ts`. Store images or CSV presets under `src/assets/`. Place new Vitest helpers beside `src/test/utils/`. Static files exposed by Vite belong in `public/`; production bundles output to `dist/`. Root configs (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`) drive tooling.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies before your first run.
- `pnpm dev` — start the Vite dev server with hot reload at `http://localhost:5173`.
- `pnpm build` — type-check via `tsc -b` then emit optimized assets with Vite.
- `pnpm preview` — serve the latest build for manual smoke testing.
- `pnpm lint` — run ESLint across `.ts/.tsx` sources.
- `pnpm format` — apply Prettier formatting rules in place.
- `pnpm test` / `pnpm test:watch` — execute the Vitest suite once or in watch mode.

## Coding Style & Naming Conventions
The project targets modern TypeScript and React 19. Let Prettier enforce spacing (2-space indent, semicolons, double quotes) and rely on ESLint for import ordering. Name React components and Chakra wrappers in PascalCase (`src/components/Layout.tsx`), keep hooks and utilities in camelCase, and mirror directory names when creating new modules (e.g., `src/lib/parser/DeckEncoder.ts`). Prefer functional components and Chakra UI primitives; colocate styles with components via `.css` files if needed.

## Testing Guidelines
Vitest with the jsdom environment drives unit tests (`vitest.config.ts`). Follow the existing `src/**/__tests__` structure and suffix files with `.test.ts` or `.test.tsx`. Use dedicated helpers from `src/test/utils/` when mocking browser APIs (e.g., `createMockLocalStorage`). Cover new branches introduced by your change; if behaviour varies by locale or storage state, add separate describe blocks to keep expectations clear.

## Commit & Pull Request Guidelines
Recent history shows short, imperative subject lines (e.g., `Add tests`, `共有URLを圧縮`). Keep messages under 72 characters and focus on “what” + “why`. Squash noisy work-in-progress commits locally. For pull requests, include: 1) a concise summary of behaviour changes, 2) linked issues or tickets, 3) screenshots or recordings for UI tweaks, and 4) a checklist of `pnpm lint` and `pnpm test` runs. Flag any follow-up tasks so reviewers can plan maintenance.

## Communication Preferences
リファクタリング方針や疑問点を共有するときは、Pull Requestの説明やコメントを日本語で記載してください。テキストベースの応答も原則として日本語で返答してください。
