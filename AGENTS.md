# Project Context & Agents

This file is the primary runbook for AI agents working in this repository. Claude Code loads it via `CLAUDE.md`.

Repo docs under `docs/` are part of the deliverable, not optional commentary. Update them in the same change when you alter the behavior or structure they describe.

## Overview

- **Bun monorepo** (Turbo workspaces) publishing a framework-agnostic design system: `@temporal-ui/core`, `@temporal-ui/react`, `@temporal-ui/solid`
- No backend, databases, or env files. Visual work happens in Storybook; correctness is Vitest + typecheck
- Pinned package manager: `bun@1.3.12` (see `packageManager` in root `package.json`)

## Documentation

- **Architecture**: `docs/architecture.md` — packages, component layering, catalog, tooling
- **Code generation**: `docs/code-generation.md` — follow when adding or changing components
- **Testing strategy**: `docs/testing-strategy.md` — follow when writing Vitest tests
- **Linear issues**: `docs/linear-issues.md` — workflow when given a `TPX-*` issue
- **npm release setup**: `docs/npm-release-setup.md` — trusted publishing bootstrap (one-time); agents use the release workflow below for publishing

## Package manager

Use **Bun only**. Do not use npm, yarn, or pnpm.

```bash
bun install
```

## Commands

| Action             | Command                                   |
| ------------------ | ----------------------------------------- |
| Install            | `bun install`                             |
| Build all packages | `bun run build`                           |
| Unit tests         | `bun run test`                            |
| One test file      | `bun run test -- <path to file>`          |
| Typecheck          | `bun run typecheck`                       |
| Lint               | `bun run lint` / `bun run lint:fix`       |
| Format             | `bun run format` / `bun run format:check` |
| React Storybook    | `bun run react` → http://localhost:6006   |
| Solid Storybook    | `bun run solid` → http://localhost:6007   |
| Clean              | `bun run clean`                           |
| Changeset          | `bun run changeset`                       |

## Versioning and releases

Published packages: `@temporal-ui/core`, `@temporal-ui/react`, `@temporal-ui/solid` (lockstep versions via Changesets).

### Feature branches and changesets

If a feature branch ships code that should version the library, the PR **must** include a changeset. Run from the repo root:

```bash
bun run changeset
```

Commit the generated file under `.changeset/`. Changesets accumulate on `main` after merge; they do not publish by themselves.

Add a changeset when the change affects consumers of the published packages — for example:

- New or changed component APIs, props, or exports
- Bug fixes or behavior changes in published packages
- Dependency or build output changes that affect installs

Skip a changeset for internal-only work (docs, CI, tests with no package behavior change, Storybook-only tweaks) unless the user asks for a release note.

Use `bun run changeset --empty` only when explicitly documenting a no-release change.

### Publishing a new version

When the user asks to **publish**, **release**, or **ship a new version**, trigger the GitHub Actions release workflow on `main`. Do **not** run `npm publish` or `bun run publish` locally unless the user explicitly asks for a local/manual publish.

```bash
gh workflow run release.yml --ref main
```

Then watch the run (optional):

```bash
gh run list --workflow=release.yml --limit 1
gh run watch <run-id>
```

The workflow applies pending changesets (version bump + changelog + commit to `main`), publishes to npmjs.org, and creates git tags and GitHub Releases. Re-run the same command to retry if publish failed after versioning.

One-time npm OIDC and registry setup: `docs/npm-release-setup.md`.

## Workflow

### Build before typecheck

Turbo `typecheck` depends on `^build`. Core must be built so React/Solid can resolve its types. Root `lint` (`oxlint`) does **not** go through Turbo and does not need a prior build.

```bash
bun run build
bun run lint:fix
bun run typecheck
```

Tests do **not** require a prior build.

### Before committing

Run formatter, linter, and typecheck together. Do not skip typecheck:

```bash
bun run format
bun run lint:fix
bun run typecheck
```

Lefthook already runs format, `lint:fix`, and `typecheck` on pre-commit.

## Tooling

- **oxlint** / **oxfmt** for lint and format (not Biome, ESLint, or Prettier)
- **tsgo** (`@typescript/native-preview`) for per-package typecheck
- **tsdown** for package bundles; **Turbo** for task orchestration
- **Vitest** for tests (React: happy-dom + Testing Library; Solid: jsdom + `@solidjs/testing-library`)
- **Storybook 10** for component development
- **Changesets** for versioning published packages
- **Ark UI MCP** (`.cursor/mcp.json`) when wrapping or inspecting Ark UI APIs — use `react` or `solid` as the framework

## Linear issues

When given a Linear issue ID (e.g. `TPX-412`), follow `docs/linear-issues.md`.

## Cursor Cloud

No local services to start. After `bun install`:

1. `bun run test` for unit tests
2. `bun run build && bun run typecheck` before claiming types are clean
3. `bun run react` / `bun run solid` only when you need to inspect UI in Storybook

Push and open a PR only when `docs/linear-issues.md` says to (cloud Linux environment, after the work is done).

## Common mistakes

- Do not use `npm`, `yarn`, or `pnpm`
- Do not run ESLint, Prettier, or Biome; this repo uses oxlint and oxfmt
- Do not run `typecheck` without a build (or expect Turbo to build dependencies first)
- Do not change only React or only Solid — keep framework bindings in sync unless the task is explicitly one-sided
- Do not invent component APIs in a framework package; shared props live in `@temporal-ui/core`
- Do not ship versionable library changes without a changeset in the PR
- Do not publish to npm locally when the user wants a release; run `gh workflow run release.yml --ref main`
