# FlyRank Capstone — AI Content Assistant

An AI-powered web app that helps users draft, refine, and analyze content with an LLM — built as my capstone for the FlyRank AI Internship (Frontend AI Engineering track).

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express (TypeScript)
- **AI:** Claude API (Anthropic)
- **Tooling:** Claude Code as AI pair programmer, ESLint + Prettier

## Status

Week 1 — environment and toolchain setup. Features land in upcoming weeks.

## Getting Started

```bash
git clone https://github.com/sanathSK07/flyrank-capstone.git
cd flyrank-capstone
npm install   # once the app is scaffolded
npm run dev
```

You will need Node.js 20+ (LTS) and an Anthropic API key in `.env` (see `.env.example`, coming with the API scaffold).

## Roadmap

- [x] Repo scaffold, license, .gitignore, CLAUDE.md
- [ ] Frontend scaffold (Vite + React + Tailwind)
- [ ] Express API with Claude integration
- [ ] Streaming chat UI
- [ ] Deploy

## Conventions

All commits follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). See [CLAUDE.md](CLAUDE.md) for full project conventions.

## License

MIT — see [LICENSE](LICENSE).
