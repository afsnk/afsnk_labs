# Complete File Structure

This document provides a comprehensive overview of all files in the monorepo.

## Root Level

```
stablecoin-payment-modal/
│
├── 📄 package.json
│   Root workspace manifest
│   - Workspace definition
│   - Shared scripts (dev, build, publish)
│   - Workspace metadata
│
├── 📄 pnpm-workspace.yaml
│   pnpm workspace configuration
│   - Defines packages/* as packages
│
├── 📄 tsconfig.base.json
│   Shared TypeScript configuration
│   - Base compiler options
│   - Extended by all packages
│
├── 📄 .npmrc
│   pnpm configuration
│   - shamefully-hoist=true
│   - strict-peer-dependencies=false
│
├── 📄 .gitignore
│   Git ignore patterns
│   - node_modules, dist, build
│   - .env, .DS_Store, logs
│
├── 📄 README.md
│   Main project documentation
│   - Overview and features
│   - Package descriptions
│   - Quick links
│
├── 📄 QUICK_START.md
│   5-minute setup guide
│   - Prerequisites
│   - Common commands
│   - Quick reference
│
├── 📄 SETUP.md
│   Comprehensive setup guide
│   - Detailed installation
│   - Development workflow
│   - Publishing process
│   - Troubleshooting
│
├── 📄 MONOREPO.md
│   Monorepo architecture documentation
│   - Why monorepo
│   - Workspace structure
│   - Publishing strategy
│   - Best practices
│
├── 📄 CONTRIBUTING.md
│   Contribution guidelines
│   - Code of conduct
│   - Development guidelines
│   - PR process
│   - Release process
│
├── 📄 IMPLEMENTATION_SUMMARY.md
│   What was built summary
│   - Overview of all components
│   - Feature list
│   - Configuration details
│
└── 📄 FILE_STRUCTURE.md
    This file
    - Complete file listing
    - File purposes
```

## Packages Directory

### npm Package (`packages/npm`)

**NPM Package Distribution**
- Package name: `@stablecoin/payment-modal`
- Type: Compiled npm module
- Distribution: npm registry

```
packages/npm/
│
├── 📄 package.json
│   NPM package configuration
│   - Package name and version
│   - Main, module, exports fields
│   - Dependencies and peer dependencies
│   - Scripts (build)
│
├── 📄 tsconfig.json
│   TypeScript configuration for npm package
│   - Extends ../../tsconfig.base.json
│   - Declaration output settings
│
├── 📄 tsup.config.ts
│   Build configuration
│   - ESM and CJS output
│   - TypeScript declarations
│   - Bundler settings
│
├── 📄 .npmignore
│   NPM ignore patterns
│   - src/, tsconfig.json
│   - Build config files
│
├── 📄 README.md
│   NPM package documentation
│   - Installation instructions
│   - Usage examples
│   - API documentation
│   - Web3 integration guide
│
├── dist/ (generated after build)
│   Compiled output
│   ├── index.mjs (ES Module)
│   ├── index.cjs (CommonJS)
│   ├── index.d.ts (TypeScript declarations)
│   └── *.d.ts.map (source maps)
│
└── src/
    Source code
    │
    ├── components/
    │   ├── StablecoinPaymentModal.tsx
    │       Main component
    │       - 330+ lines
    │       - Self-contained (no UI framework deps)
    │       - Inline Dialog and Select implementations
    │       - Wallet connection integration
    │       - Copy-to-clipboard functionality
    │
    ├── types/
    │   └── index.ts
    │       Type definitions
    │       - StablecoinPaymentModalProps
    │       - Network interface
    │       - Stablecoin interface
    │
    └── index.ts
        Barrel export
        - Exports component and types
        - Single entry point for bundler
```

### shadcn/ui Registry (`packages/registry`)

**shadcn/ui Component Registry**
- Package name: `@stablecoin/registry`
- Type: Source-based component registry
- Distribution: npm registry (users copy source)

```
packages/registry/
│
├── 📄 package.json
│   Registry package configuration
│   - Package metadata
│   - Files to include in npm
│   - No build scripts needed
│
├── 📄 README.md
│   Registry documentation
│   - Installation via shadcn CLI
│   - Component props
│   - Customization guide
│   - Web3 integration examples
│
├── registry/
│   shadcn/ui registry structure
│   │
│   └── default/
│       Default registry collection
│       │
│       └── stablecoin-payment-modal.json
│           Component manifest
│           - Component metadata
│           - Dependencies declaration
│           - File paths
│           - Installation configuration
│
└── src/
    Source code (copied to user projects)
    │
    └── stablecoin-payment-modal.tsx
        Component for shadcn/ui projects
        - 230+ lines
        - Uses shadcn/ui components (Dialog, Select, Button)
        - Uses Radix UI primitives
        - Full feature parity with npm version
```

### Demo App (`packages/demo`)

**Next.js 16 Showcase Application**
- App name: `@stablecoin/demo`
- Type: Full-stack Next.js application
- Purpose: Demonstrate both distributions

```
packages/demo/
│
├── 📄 package.json
│   Demo app configuration
│   - Dependency on @stablecoin/payment-modal
│   - All Next.js dependencies
│   - shadcn/ui components
│
├── 📄 tsconfig.json
│   TypeScript configuration
│   - Extends ../../tsconfig.base.json
│   - Next.js plugin
│   - @ path alias for components
│
├── app/
│   Next.js App Router
│   │
│   ├── layout.tsx
│       Root layout component
│       - 46 lines
│       - Font imports (Geist, Geist Mono)
│       - Metadata configuration
│       - Analytics integration
│       - Body wrapper
│
│   ├── page.tsx
│       Home page
│       - 167 lines
│       - Demo state management
│       - Distribution toggle (npm vs shadcn)
│       - Modal integration
│       - Features showcase
│       - Installation code snippets
│       - Distribution comparison cards
│
│   └── globals.css
│       Global styles
│       - 126 lines
│       - Tailwind CSS imports
│       - Design tokens (CSS variables)
│       - Color theme configuration
│       - Light and dark mode
│       - Font variable setup
│       - Tailwind theme configuration
│
├── components/
│   Component directory (inherited from project)
│   - ui/ subdirectory (shadcn/ui components)
│   - Layout components
│   - Utility components
│
├── public/
│   Static assets
│   - Favicons
│   - Icons
│
├── .next/
│   Next.js build output (generated)
│   - Cached builds
│   - Server components
│
└── node_modules/
    Dependencies (generated)
    - Next.js
    - React
    - shadcn/ui
    - All Radix UI primitives
```

## File Statistics

### Total Files Created

```
Root Configuration:      8 files
Documentation:          8 files
npm Package:           6 files
Registry Package:      4 files
Demo App:              3 files (+ inherited)
───────────────────
Total:                29 files
```

### Lines of Code/Documentation

```
npm Package Code:      350+ lines
Registry Code:         230+ lines
Demo App Code:         213+ lines
Documentation:        2000+ lines
Configuration:         100+ lines
───────────────────
Total:               2900+ lines
```

## Configuration Files Details

### package.json Files

**Root (package.json)**
```json
{
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "pnpm -C packages/demo dev",
    "build": "pnpm -r --filter ./packages build",
    "publish:npm": "pnpm -C packages/npm publish"
  }
}
```

**npm (packages/npm/package.json)**
```json
{
  "name": "@stablecoin/payment-modal",
  "version": "1.0.0",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": { ... },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

**Registry (packages/registry/package.json)**
```json
{
  "name": "@stablecoin/registry",
  "version": "1.0.0",
  "files": ["registry", "src", "README.md"]
}
```

**Demo (packages/demo/package.json)**
```json
{
  "name": "@stablecoin/demo",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "@stablecoin/payment-modal": "workspace:*"
  }
}
```

### TypeScript Configuration Files

**tsconfig.base.json**
- Base configuration for all packages
- ES2020 target
- Strict mode enabled
- React JSX mode

**packages/npm/tsconfig.json**
- Extends base config
- Declaration output
- Library-specific settings

**packages/registry/tsconfig.json**
- None (source-only, no build)

**packages/demo/tsconfig.json**
- Extends base config
- Next.js plugin
- @ path alias

## Build Output Structure

After running `pnpm build`, the following is generated:

```
packages/npm/dist/
├── index.mjs              # ES Module (modern)
├── index.cjs              # CommonJS (legacy)
├── index.d.ts             # TypeScript declarations
└── index.d.ts.map         # Source map for types

packages/demo/.next/
├── [build cache]
└── [compiled pages]
```

## Documentation Files

```
README.md
  ├── Project overview
  ├── Package descriptions
  ├── Quick start
  └── Scripts reference
  
QUICK_START.md
  ├── 5-minute setup
  ├── Common commands
  └── Troubleshooting basics
  
SETUP.md (450 lines)
  ├── Prerequisites
  ├── Installation
  ├── Development workflow
  ├── Publishing process
  ├── CI/CD setup
  └── Troubleshooting guide
  
MONOREPO.md (511 lines)
  ├── Architecture overview
  ├── Workspace structure
  ├── Publishing strategy
  ├── Dependency management
  ├── Development workflow
  └── Best practices
  
CONTRIBUTING.md (307 lines)
  ├── Code of conduct
  ├── Setup instructions
  ├── Development guidelines
  ├── Commit conventions
  ├── PR process
  └── Release process
  
IMPLEMENTATION_SUMMARY.md (440 lines)
  ├── What was built
  ├── Package distributions
  ├── Key features
  ├── Configuration details
  ├── Build process
  └── Next steps
  
FILE_STRUCTURE.md (this file)
  ├── Directory layout
  ├── File purposes
  └── File statistics
```

## Environment Setup

### .npmrc
```
shamefully-hoist=true
strict-peer-dependencies=false
```

### .gitignore
Covers:
- Dependencies (node_modules)
- Build output (dist, .next, build)
- Environment files (.env.local)
- IDE files (.vscode, .idea)
- Logs and temporary files

## Key File Relationships

```
Root Configuration
  ├─→ pnpm-workspace.yaml
  ├─→ tsconfig.base.json
  ├─→ .npmrc
  └─→ package.json

npm Package
  ├─→ src/index.ts (entry)
  ├─→ src/components/
  ├─→ src/types/
  ├─→ tsup.config.ts (build)
  └─→ dist/ (output)

Registry
  ├─→ registry/default/ (manifest)
  ├─→ src/ (source code)
  └─→ package.json

Demo
  ├─→ app/layout.tsx (root)
  ├─→ app/page.tsx (showcase)
  ├─→ app/globals.css (styles)
  └─→ components/ (UI components)
```

## Size Summary

### Source Code
- npm package: ~350 lines
- Registry: ~230 lines
- Demo: ~213 lines
- **Total: ~800 lines**

### Documentation
- Setup: 450 lines
- Monorepo: 511 lines
- Contributing: 307 lines
- Implementation: 440 lines
- README: 268 lines
- Other guides: 300 lines
- **Total: 2300+ lines**

### Configuration
- JSON files: 100+ lines
- TypeScript config: 80+ lines
- Build config: 20 lines
- **Total: 200+ lines**

## Access Patterns

### For Package Users
```
npm package:
  ↓ (install)
  node_modules/@stablecoin/payment-modal
  ↓ (import)
  import { StablecoinPaymentModal } from '@stablecoin/payment-modal'

shadcn/ui:
  ↓ (shadcn add)
  components/stablecoin-payment-modal.tsx
  ↓ (import)
  import { StablecoinPaymentModal } from '@/components/stablecoin-payment-modal'
```

### For Developers
```
Make changes → packages/npm/src/
            → packages/registry/src/
            
Test changes → pnpm dev
            → open http://localhost:3000
            
Build → pnpm build
      → dist/ generated
      
Publish → pnpm publish:npm
        → npm registry
```

---

For more information, see:
- [README.md](README.md) - Project overview
- [QUICK_START.md](QUICK_START.md) - Quick reference
- [SETUP.md](SETUP.md) - Detailed guide
- [MONOREPO.md](MONOREPO.md) - Architecture
