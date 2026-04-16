# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager

- Uses **Bun** as the package manager (not npm/yarn)
- Install dependencies: `bun install`

### Common Commands

- `bun run build` - Build all packages using Turbo
- `bun run test` - Run all tests across packages
- `bun run typecheck` - TypeScript type checking
- `bun run lint` - Lint code using Biome
- `bun run format` - Format code using Biome (`turbo run write`)
- `bun run check` - Run Biome checks
- `bun run clean` - Clean build artifacts and node_modules

### Development Servers

- `bun run react` - Start React Storybook development server (port 6006)
- `bun run solid` - Start Solid.js Storybook development server

### Package-Specific Commands

- Individual packages can run: `test`, `lint`, `typecheck`, `clean`
- React package: `bun run storybook`, `bun run build-storybook`
- Core package: Uses Vitest for testing

## Project Architecture

### Monorepo Structure

This is a **monorepo** using:

- **Turbo** for build orchestration and task running
- **Workspaces** for package management
- **Lefthook** for git hooks (currently example config only)
- **Changesets** for versioning and changelog management

### Directory Structure

```
temporal-ui/
├── packages/
│   ├── core/           # Framework-agnostic component definitions
│   ├── react/          # React implementations
│   └── solid/          # Solid.js implementations
├── scripts/            # Build and utility scripts
│   ├── copy-core-styles.mjs
│   ├── replace-protocols.mjs
│   └── restore-protocols.mjs
├── .changeset/         # Changeset configuration
├── .github/            # GitHub workflows and actions
├── biome.json          # Biome linter/formatter config
├── turbo.json          # Turbo build config
└── tsconfig.json       # Root TypeScript config
```

### Package Organization

#### 1. `@temporal-ui/core` - Framework-agnostic core

```
packages/core/src/
├── components/         # Component definitions and CSS
├── css/                # Global CSS files
│   ├── animations.css  # Animation utilities
│   ├── base.css        # Base styles and resets
│   └── theme.css       # CSS custom properties/theme tokens
├── utils/              # Shared utilities
│   ├── cx/             # Class name concatenation utility
│   └── string/         # String manipulation utilities
└── styles.css          # Main CSS entry point
```

#### 2. `@temporal-ui/react` - React implementations

```
packages/react/src/
├── components/         # React component implementations
├── hooks/              # React-specific hooks
│   └── is-mobile/      # Mobile detection hook
├── utils/              # React-specific utilities
│   ├── cx/
│   └── string/
├── index.ts            # Main exports
└── styles.css          # Style imports
```

#### 3. `@temporal-ui/solid` - Solid.js implementations

- Similar structure to React package
- Uses Solid.js specific patterns and primitives

## Components List

The following components are available across the library:

### Layout & Structure

| Component    | Description                      |
| ------------ | -------------------------------- |
| `Box`        | Basic layout primitive           |
| `Stack`      | Vertical/horizontal stack layout |
| `Card`       | Container with card styling      |
| `Separator`  | Visual divider                   |
| `Sidebar`    | Collapsible sidebar navigation   |
| `ScrollArea` | Custom scrollable area           |

### Forms & Inputs

| Component     | Description                         |
| ------------- | ----------------------------------- |
| `Button`      | Primary action button with variants |
| `TextInput`   | Text input field                    |
| `Textarea`    | Multi-line text input               |
| `NumberInput` | Numeric input with controls         |
| `Checkbox`    | Checkbox with label support         |
| `RadioGroup`  | Radio button group                  |
| `Select`      | Dropdown selection                  |
| `Slider`      | Range slider input                  |
| `ColorInput`  | Color picker input                  |
| `DateInput`   | Date picker input                   |
| `Field`       | Form field wrapper with label/error |
| `Toggle`      | Two-state toggle button             |
| `ToggleGroup` | Group of toggle buttons             |

### Data Display

| Component   | Description                       |
| ----------- | --------------------------------- |
| `Table`     | Basic table component             |
| `DataTable` | Advanced data table with features |
| `Badge`     | Status/label badge                |
| `Avatar`    | User avatar display               |

### Feedback & Overlays

| Component       | Description               |
| --------------- | ------------------------- |
| `Alert`         | Alert/notification banner |
| `Dialog`        | Modal dialog              |
| `Popover`       | Floating popover content  |
| `Menu`          | Dropdown menu             |
| `Notifications` | Toast notification system |
| `Loader`        | Loading spinner/indicator |

### Navigation

| Component     | Description                    |
| ------------- | ------------------------------ |
| `Tabs`        | Tabbed navigation              |
| `Collapsible` | Expandable/collapsible section |

## Component Structure

Each component follows this pattern:

```
component-name/
├── index.ts              # Exports
├── Component.tsx         # React/Solid implementation
├── Component.stories.tsx # Storybook stories
├── Component.test.tsx    # Unit tests
└── (core package has .css and .ts definition files)
```

## Key Technologies

- **Ark UI** - Headless UI components foundation (React/Solid)
- **Biome** - Linting and formatting (replaces ESLint/Prettier)
- **Vitest** - Testing framework
- **Storybook** - Component documentation and development
- **TypeScript** - Type system
- **CSS** - Component styling (no CSS-in-JS)
- **tsup** - Bundling for framework packages

## Code Style & Standards

### Biome Configuration

- Tab indentation (width: 4)
- Line width: 120 characters
- Double quotes for strings
- Organize imports enabled

### Component Patterns

- All components extend `BaseComponent` interface from core
- Support `className`, `children`, and `testId` props
- Framework-agnostic core definitions with framework-specific implementations
- CSS classes follow consistent naming patterns
- Uses data attributes for component state (e.g., `data-scope`, `data-size`, `data-variant`)

### File Organization

- Core package: component definitions and styles
- Framework packages: implementations with stories and tests
- Utilities in `src/utils/` with tests co-located
- Export patterns defined in package.json `exports` field

## Testing

- Use `bun run test` to run all tests
- Individual package testing available
- React Testing Library for React components
- Happy DOM for test environment
- Coverage reports available with `test:coverage`
