# AGENTS.md

Instructions for AI agents (e.g. Cursor Cloud) working in this repository.

## Overview

- **Bun-based monorepo** with 3 packages: `core`, `react`, `solid`
- No external services or databases
- **CLAUDE.md** has the full command reference and architecture

## Package Manager

- Use **Bun only**. Do not use npm, yarn, or pnpm.
- Pinned version: `bun@1.2.23` (see `packageManager` in root `package.json`)
- Install: `bun install`

## Workflow

### Before lint or typecheck

Run `bun run build` first. Turbo’s `lint` and `typecheck` tasks depend on `^build`; core must be built so React/Solid packages can resolve its types.

```bash
bun run build
bun run lint
bun run typecheck
```

### Tests

```bash
bun run test
```

Tests do **not** require a prior build. Run individual suites with:

```bash
bun run test -- <path to file>
```

### Development servers

| Command         | Server          | Port |
| --------------- | --------------- | ---- |
| `bun run react` | React Storybook | 6006 |
| `bun run solid` | Solid Storybook | 6007 |

## Tooling

- **Biome** for linting and formatting (not ESLint/Prettier). Config: `biome.json` (tabs, double quotes, 120 char width).
- **Lefthook** runs on pre-commit: `biome format --write`, `bun run lint`, `bun run typecheck` on staged files.

## Agent-specific rules

- **Unit tests**: When creating Vitest tests, use the agent-requestable rule `.cursor/rules/unit-testing.mdc`.

## Linear issues

When given a linear issue ID (e.g. `TPX-412`), you must follow instructions in `docs/linear-issues.md`.

## Common mistakes to avoid

- Do not use `npm install`, `yarn`, or `pnpm`
- Do not run `eslint` or `prettier`; use Biome
- Do not run `lint` or `typecheck` without first running `build` (or expect a build to run as part of the pipeline)

## Cursor Cloud specific instructions

- **Tooling drift**: Some docs (README/CLAUDE.md and sections above) still say Biome and `bun@1.2.23`. The repo actually uses **oxlint** (`bun run lint`), **oxfmt** (`bun run format`), `tsgo` for typecheck, and `bun@1.3.12` (see `packageManager` in `package.json`). Trust `package.json` over the prose docs.
- **`bun install` postinstall fails here (expected)**: The root `postinstall` runs `lefthook install`, which exits 1 in Cursor Cloud because git `core.hooksPath` is set to Cursor's agent hooks and lefthook refuses to override it. Dependencies still install fully — only the git-hook step fails. The startup update script therefore uses `bun install --ignore-scripts`; if you run a plain `bun install` manually and it only errors on `lefthook install`, ignore that error.
- **The "app" is Storybook** (this is a component library, no backend/DB): React on port 6006 (`bun run react`), Solid on port 6007 (`bun run solid`). Both are long-running dev servers — start them in a background/tmux session. Verify with `curl -s -o /dev/null -w '%{http_code}' http://localhost:6006/`.
- After changing the selected story in the Storybook sidebar, give the canvas iframe a moment to load; a transiently restarted server can show a briefly blank canvas.
