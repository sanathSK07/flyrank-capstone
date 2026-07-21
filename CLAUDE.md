# CLAUDE.md

Guidance for AI assistants (Claude Code / Cursor) working in this repo.

## Project

AI Content Assistant — a React + Node/TypeScript web app that uses the Claude API to help users draft and refine content. FlyRank AI Internship capstone (Frontend AI Engineering track).

## Stack

- React 18 + TypeScript + Vite, Tailwind CSS for styling
- Node.js + Express (TypeScript) API in `server/`
- Claude API for AI features (streaming responses preferred)
- ESLint + Prettier, npm as package manager

## Structure (planned)

- `src/` — React app (components, hooks, lib)
- `server/` — Express API
- `docs/` — design notes and decisions

## Conventions

- **Commits:** Conventional Commits 1.0.0 (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`). Imperative mood, lowercase subject, no trailing period.
- **TypeScript:** `strict` mode on; avoid `any` — prefer explicit types or `unknown`.
- **Components:** function components + hooks only; one component per file; props typed with interfaces.
- **Styling:** Tailwind utility classes; no inline style objects unless dynamic.
- **API keys:** never hardcode secrets; use `.env` (gitignored). Claude API calls go through the server, never from the browser.
- **Error handling:** surface user-friendly messages in the UI; log details server-side.

## Rules learned in FE-03 (AI-assisted workflow drill)

- **Schema-first validation:** every form validates through a zod schema in its own module (`validation.ts`); components consume `safeParse` results. No inline regex validation in components — round one's `/\S+@\S+/` accepted `a@@b`.
- **Reset status flags on every submit:** any "saved/success" state must be cleared at the top of the submit handler, not only set on success — otherwise a failed resubmit shows success and error together (round-one bug).
- **Accessible forms are testable forms:** every input gets `label htmlFor`, errors get `role="alert"` + `aria-invalid` + `aria-describedby`, confirmations get `role="status"`. If `getByLabelText` can't find a control, the markup is wrong.
- **Green tests ≠ green build:** verification runs both `vitest run` and `tsc -b`. Vitest config imports `defineConfig` from `vitest/config`, never `vite` — and keep vite/vitest major versions compatible.
- **Settings forms never clear on save:** persist submitted (trimmed) values back into the fields.

## Working with this repo

- Run `npm run lint` and `npm run typecheck` before committing (once scaffolded).
- Keep PRs/commits small and focused; one logical change per commit.
- When adding a feature, update the README roadmap checkbox.
