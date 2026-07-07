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
