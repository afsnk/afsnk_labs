# Monorepo Architecture & Strategy

This document details the monorepo architecture, design decisions, and how to work with the structure.

## Table of Contents

1. [Overview](#overview)
2. [Why Monorepo?](#why-monorepo)
3. [Workspace Structure](#workspace-structure)
4. [Package Management](#package-management)
5. [Publishing Strategy](#publishing-strategy)
6. [Dependency Management](#dependency-management)
7. [Development Workflow](#development-workflow)
8. [Best Practices](#best-practices)

## Overview

This is a **pnpm monorepo** containing three packages:

1. **npm Package** - `@stablecoin/payment-modal` - Installable via npm
2. **shadcn/ui Registry** - `@stablecoin/registry` - Installable via `shadcn-ui add`
3. **Demo App** - `@stablecoin/demo` - Next.js showcase application

All packages share:
- Workspace dependencies
- TypeScript configuration
- Design tokens
- Component logic (kept in sync)

## Why Monorepo?

### Benefits

✅ **Code Sharing** - Common utilities, types, and components in one place
✅ **Consistent Versioning** - All packages release together
✅ **Single Test Suite** - Run all tests from root
✅ **Simplified Development** - Develop and test everything simultaneously
✅ **Unified CI/CD** - One workflow manages all packages
✅ **Atomic Commits** - Related changes grouped in one commit
✅ **Type Safety** - Shared TypeScript configuration ensures consistency

### Trade-offs

⚠️ **Larger Repository** - Single git repo for all packages
⚠️ **Coordination** - Need to manage cross-package changes
⚠️ **Publishing** - Must keep packages in sync

## Workspace Structure

### File Organization

```
stablecoin-payment-modal/          # Root
├── packages/
│   ├── npm/                       # NPM package
│   ├── registry/                  # shadcn/ui registry
│   └── demo/                      # Demo app
├── pnpm-workspace.yaml            # Workspace definition
├── tsconfig.base.json             # Shared TS config
├── .npmrc                         # pnpm config
├── package.json                   # Workspace manifest
├── README.md                      # Project overview
├── SETUP.md                       # Setup guide
├── CONTRIBUTING.md                # Contribution guide
└── MONOREPO.md                    # This file
```

### Root Configuration Files

#### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
```

Tells pnpm which folders are packages. Uses glob patterns.

#### package.json

```json
{
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "pnpm -C packages/demo dev",
    "build": "pnpm -r build",
    "publish:npm": "pnpm -C packages/npm publish"
  }
}
```

- `private: true` - Prevents accidental root publishing
- `workspaces` - Alternative to pnpm-workspace.yaml (for npm/yarn compatibility)
- Scripts for common operations

#### .npmrc

```
shamefully-hoist=true
strict-peer-dependencies=false
```

- Hoisting: Dependencies resolved at root, avoiding duplication
- Peer deps: Allow flexibility in dependency versions

#### tsconfig.base.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "esnext",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

Extended by all packages for consistency.

## Package Management

### Adding Dependencies

#### To Root (shared by all)

```bash
pnpm add lodash-es
# Installed at root node_modules
```

#### To Specific Package

```bash
pnpm add -C packages/npm @radix-ui/react-dialog
# Only for npm package
```

#### To Multiple Packages

```bash
pnpm add -r react@latest
# Adds react@latest to all packages
```

#### Dev Dependencies

```bash
pnpm add -D typescript
pnpm add -C packages/npm -D tsup
```

### Dependency Hoisting

With `shamefully-hoist=true`, dependencies are installed at root:

```
node_modules/
├── react/              # Shared by all
├── @radix-ui/
│   └── react-dialog/   # Shared by all
└── packages/
    ├── npm/
    │   └── node_modules/  # Package-specific only
    ├── registry/
    └── demo/
```

This reduces disk usage and avoids duplication.

### Workspace References

Reference local packages using `workspace:*`:

```json
{
  "dependencies": {
    "@stablecoin/payment-modal": "workspace:*"
  }
}
```

pnpm will:
1. Use local version during development
2. Convert to exact version during publish

## Publishing Strategy

### Dual Distribution

The monorepo enables two distribution methods:

#### 1. npm Package

**What:** Compiled JavaScript module
**Where:** npm registry
**Installation:** `npm install @stablecoin/payment-modal`
**Use Case:** Drop-in component, locked versions

```
npm package distribution flow:
src/ → TypeScript → tsup → dist/ → npm publish
```

#### 2. shadcn/ui Registry

**What:** Source code component
**Where:** GitHub registry
**Installation:** `npx shadcn@latest add stablecoin-payment-modal`
**Use Case:** Full customization, projects using shadcn

```
shadcn flow:
src/ → registry manifest → GitHub → shadcn CLI → project
```

### Version Management

All packages release with the same version:

```
1.0.0 - Initial release
1.0.1 - Bug fix (patch)
1.1.0 - New feature (minor)
2.0.0 - Breaking change (major)
```

Update in:
1. `packages/npm/package.json`
2. `packages/registry/package.json`
3. `package.json` (root, optional)

### Publishing Process

```bash
# 1. Make changes and test
pnpm dev

# 2. Build all packages
pnpm build

# 3. Update versions
npm version patch

# 4. Publish to npm
pnpm publish:npm

# 5. Publish registry to npm
pnpm publish:registry

# 6. Create git tag and push
git tag v1.0.1
git push origin v1.0.1
```

## Dependency Management

### Package Dependencies

#### npm Package (`@stablecoin/payment-modal`)

**Peer Dependencies** (user must install):
```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "tailwindcss": ">=3.0.0"
  }
}
```

**Runtime Dependencies**:
- `@radix-ui/react-dialog`
- `@radix-ui/react-select`
- `lucide-react`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

#### Registry Package (`@stablecoin/registry`)

**Peer Dependencies**:
```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

No runtime dependencies - source is copied to user projects.

#### Demo App (`@stablecoin/demo`)

**Dependencies**: Everything needed for Next.js + shadcn/ui
- Full stack of shadcn/ui components
- Next.js and React
- Development tools

### Dependency Philosophy

- **npm package:** Minimal dependencies for small bundle
- **Registry:** None (source code only)
- **Demo:** Full development stack

## Development Workflow

### Local Development

```bash
# 1. Install
pnpm install

# 2. Start demo app
pnpm dev
# Runs at http://localhost:3000

# 3. Make changes to packages
# Edits to npm/ automatically rebuild via tsup watch
# Registry changes are immediate

# 4. Demo app hot-reloads with changes
```

### Cross-Package Changes

When modifying shared logic:

```
1. Update npm package:
   packages/npm/src/components/StablecoinPaymentModal.tsx

2. Mirror changes to registry:
   packages/registry/src/stablecoin-payment-modal.tsx

3. Test in demo:
   pnpm dev  # Verify both npm and registry versions work
```

### Building for Distribution

```bash
# Build all
pnpm build

# Build specific
pnpm build:npm     # Creates packages/npm/dist/
pnpm build:registry # (no build needed - source based)

# Outputs
packages/npm/dist/
├── index.mjs       # ES Module
├── index.cjs       # CommonJS
└── index.d.ts      # TypeScript declarations
```

## Best Practices

### 1. Keep Feature Parity

Both npm and registry should have identical features:

```
❌ npm has feature X, registry doesn't
✅ Both have feature X with same API
```

### 2. Maintain Shared Types

Define types in one place:

```typescript
// packages/npm/src/types/index.ts
export interface StablecoinPaymentModalProps { ... }

// Both npm and registry import from here
import type { StablecoinPaymentModalProps } from '../types'
```

### 3. Document Breaking Changes

In CHANGELOG or release notes:

```markdown
## 2.0.0

### Breaking Changes
- Renamed `onConnect` prop to `onWalletConnect`
- Removed support for custom networks (use presets)

### Migration Guide
```

### 4. Test Both Distribution Methods

Before release:

```bash
# Test npm locally
npm pack packages/npm
npm install ./stablecoin-payment-modal-1.0.0.tgz

# Test registry
npx shadcn@latest add stablecoin-payment-modal
```

### 5. Version Coordination

Use semantic versioning:
- **Patch (1.0.1):** Bug fixes
- **Minor (1.1.0):** New features, backward compatible
- **Major (2.0.0):** Breaking changes

All packages must use the same version.

### 6. Clear Commit Messages

Specify which package(s) are affected:

```
feat(npm): Add onConnect callback support
fix(registry): Update import paths for shadcn@latest
docs(repo): Update installation guide
```

### 7. CI/CD Automation

Set up GitHub Actions to:
- Run tests on PR
- Build all packages
- Publish on release
- Update docs

Example workflow in `.github/workflows/`

## Migration from Single Package

If converting from a single package monorepo:

1. **Create workspace structure**
   ```bash
   mkdir packages/{npm,registry,demo}
   ```

2. **Move code to packages**
   ```bash
   mv src packages/npm/src
   mv components packages/demo/components
   ```

3. **Update imports**
   - npm package: Import from relative paths
   - demo: Import using @/ path alias

4. **Create workspace config**
   ```bash
   pnpm init # Update root package.json
   ```

5. **Install and verify**
   ```bash
   pnpm install
   pnpm build
   pnpm dev
   ```

## Troubleshooting

### Package not found

```bash
# Rebuild and reinstall
pnpm clean
pnpm install
pnpm build
```

### TypeScript errors across packages

```bash
# Check all tsconfig.json files
cat packages/*/tsconfig.json

# Rebuild with verbose output
pnpm build -- --verbose
```

### Workspace not recognizing new package

```bash
# Ensure pnpm-workspace.yaml exists
cat pnpm-workspace.yaml

# Reinstall
pnpm install
```

## Resources

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [npm Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
- [Semantic Versioning](https://semver.org/)

---

For questions or issues with the monorepo setup, check [SETUP.md](SETUP.md) or [CONTRIBUTING.md](CONTRIBUTING.md).
