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

| Command | Server | Port |
|---------|--------|------|
| `bun run react` | React Storybook | 6006 |
| `bun run solid` | Solid Storybook | 6007 |

## Tooling

- **Biome** for linting and formatting (not ESLint/Prettier). Config: `biome.json` (tabs, double quotes, 120 char width).
- **Lefthook** runs on pre-commit: `biome format --write`, `bun run lint`, `bun run typecheck` on staged files.

## Agent-specific rules

- **Unit tests**: When creating Vitest tests, use the agent-requestable rule `.cursor/rules/unit-testing.mdc`.

## Linear issues

When given a Linear issue ID (e.g. `TMPRL-123`):

1. **Before starting work**: Improve the issue description so it clearly captures scope, acceptance criteria, and any constraints.
2. **Branch name**: Always include the issue ID in the git branch name (e.g. `TMPRL-123-add-feature` or `tmprl-123/add-feature`).
3. **As you progress**: Add comments to the issue to document what you’ve done, decisions made, and any blockers or follow-ups.

## Common mistakes to avoid

- Do not use `npm install`, `yarn`, or `pnpm`
- Do not run `eslint` or `prettier`; use Biome
- Do not run `lint` or `typecheck` without first running `build` (or expect a build to run as part of the pipeline)

## Cursor Cloud specific instructions

- **Bun is installed at `~/.bun/bin/bun`**. The update script handles installation. If running bun in a fresh tmux session, ensure `~/.bun/bin` is on `PATH` (e.g. `source ~/.bashrc` or `export PATH="$HOME/.bun/bin:$PATH"`).
- **Lefthook postinstall may fail** due to Cursor's `core.hooksPath` git config. Use `bun install --ignore-scripts` if `bun install` fails, then run `bunx lefthook install --force` separately. This is a non-blocking issue — lefthook hooks are optional for agent workflows.
- **No external services required**. This is a pure frontend component library; all tests run in-memory (happy-dom/jsdom).
- **Lint warning is expected**: Biome reports 1 CSS specificity warning in the core package — this is pre-existing and not a failure.
