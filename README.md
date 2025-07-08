# Astro React Monorepo

This is a monorepo for an Astro website with React components.

## Structure

The repository is organized as follows:

```
/
├── apps
│   └── website (astro)
│       ├── src
│       │   ├── assets
│       │   ├── components
│       │   ├── layouts
│       │   ├── pages
│       │   ├── content
│       │   └── styles
│       ├── package.json
│       └── README.md
├── packages
│   └── ui-button (react)
│       ├── src
│       │   ├── components
│       │   │   └── Button.tsx
│       │   └── index.ts
│       ├── package.json
│       └── README.md
├── package.json (monorepo root)
├── pnpm-workspace.yaml
└── turbo.json
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build only the UI button package
pnpm build:ui

# Run the website in development mode
pnpm dev
```

## Packages

- `@astro-react/ui-button`: A React button component that can be used in the Astro website

## Apps

- `website`: The main Astro website that uses the React packages
