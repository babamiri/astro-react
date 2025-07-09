# Astro React Monorepo

This is a monorepo for an Astro website with React components using pnpm, Turbo, and modern React 19.

## Structure

The repository is organized as follows:

```
/
├── apps/
│   └── website/ (astro)
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── content/
│       │   └── styles/
│       ├── package.json
│       └── README.md
├── packages/
│   ├── design-tokens/ (shared design system)
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── ui-button/ (react component)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── Button.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   └── ui-saas-signup/ (react component)
│       ├── src/
│       │   ├── components/
│       │   │   └── SaaSSignup.tsx
│       │   └── index.ts
│       └── package.json
├── package.json (monorepo root)
├── pnpm-workspace.yaml
└── turbo.json
```

## Development

### Installation
```bash
# Install dependencies
pnpm install
```

### Development Mode
```bash
# Run all packages in development mode (parallel)
pnpm dev

# Run only the website
pnpm dev:website

# Run only the packages
pnpm dev:packages
```

### Building
```bash
# Build all packages and apps
pnpm build

# Build only the website
pnpm build:website

# Build only the packages
pnpm build:packages
```

### Preview Built Version
```bash
# Preview the built website (like npm run preview in React)
pnpm --filter=website preview

# Or from website directory
cd apps/website && pnpm preview
```

### Other Commands
```bash
# Clean all build artifacts
pnpm clean

# Clean workspace (including node_modules)
pnpm clean:workspace

# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck

# Format code
pnpm format
```

## Packages

- `@astro-react/design-tokens`: Shared design system with colors, spacing, typography
- `@astro-react/ui-button`: React button component with variants and states
- `@astro-react/ui-saas-signup`: React SaaS signup form component

## Apps

- `website`: Main Astro website that uses the React packages

## Tech Stack

- **Astro** - Static site generator
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **pnpm** - Package manager
- **Turbo** - Build system
- **Vazirmatn** - Persian font