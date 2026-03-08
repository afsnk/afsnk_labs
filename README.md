# Stablecoin Payment Modal Monorepo

A minimal, modern stablecoin payment modal component with dual distribution: NPM package and shadcn/ui registry. Built with TypeScript, React, and Tailwind CSS.

## Monorepo Structure

```
stablecoin-payment-modal/
├── packages/
│   ├── npm/              # @stablecoin/payment-modal NPM package
│   ├── registry/         # @stablecoin/registry (shadcn/ui)
│   └── demo/             # Next.js demo application
├── pnpm-workspace.yaml   # Workspace configuration
├── tsconfig.base.json    # Shared TypeScript config
└── package.json          # Root workspace config
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Start the demo app
pnpm dev

# Build all packages
pnpm build

# Build specific package
pnpm build:npm
pnpm build:registry
```

## Packages

### 1. @stablecoin/payment-modal (NPM Package)

**Location:** `packages/npm`

Drop-in React component with full type safety and zero external dependencies (except React).

#### Installation

```bash
npm install @stablecoin/payment-modal
```

#### Usage

```tsx
import { StablecoinPaymentModal } from '@stablecoin/payment-modal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Pay</button>
      <StablecoinPaymentModal 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        amount={100}
        currency="USD"
        onConnect={handleConnect}
      />
    </>
  );
}
```

**Features:**
- ESM and CJS exports
- Full TypeScript support
- No external UI dependencies
- Tree-shakeable
- Small bundle size

### 2. @stablecoin/registry (shadcn/ui)

**Location:** `packages/registry`

shadcn/ui component registry for integrating the modal as a source-code component.

#### Installation

```bash
npx shadcn@latest add stablecoin-payment-modal
```

#### Usage

```tsx
import { StablecoinPaymentModal } from '@/components/stablecoin-payment-modal';

export default function App() {
  // Same API as NPM version
}
```

**Features:**
- Full source code customization
- Works with existing shadcn/ui projects
- Automatic dependency installation
- Dark mode support

### 3. Demo App

**Location:** `packages/demo`

Next.js 16 application demonstrating both distribution methods.

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Workspace Scripts

```bash
# Development
pnpm dev              # Start demo app
pnpm build            # Build all packages
pnpm lint             # Run linter

# Publishing
pnpm publish:npm      # Publish to npm registry
pnpm publish:registry # Publish registry to npm

# Maintenance
pnpm clean            # Remove dist and node_modules
```

### File Structure

Each package follows a consistent structure:

```
package/
├── src/               # Source files
├── dist/              # Compiled output (generated)
├── package.json       # Package configuration
├── tsconfig.json      # TypeScript config
└── README.md          # Package documentation
```

## Building for Distribution

### NPM Package

```bash
pnpm build:npm
```

Output: `packages/npm/dist/`
- ESM: `index.mjs`
- CJS: `index.cjs`
- Types: `index.d.ts`

### shadcn/ui Registry

```bash
pnpm build:registry
```

Registry structure: `packages/registry/registry/`

## Publishing

### NPM Package

1. Update version in `packages/npm/package.json`
2. Run `pnpm publish:npm`
3. Verify on [npmjs.com](https://www.npmjs.com/package/@stablecoin/payment-modal)

### Registry

1. Push to GitHub
2. Users can install via: `npx shadcn@latest add stablecoin-payment-modal`

## Dependencies

### Peer Dependencies

Both packages require:
- React 16.8+
- React DOM 16.8+

### NPM Package Dependencies

- `@radix-ui/react-dialog` - Dialog component
- `@radix-ui/react-select` - Select component
- `@radix-ui/react-slot` - Slot composition
- `lucide-react` - Icons
- `class-variance-authority` - CSS class utility
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind CSS merge utility

### Dev Dependencies

- TypeScript 5.7+
- Next.js 16+ (demo only)
- Tailwind CSS 4.2+ (styling)
- tsup (bundler for npm package)

## Configuration Files

### pnpm-workspace.yaml

Defines the workspace structure with glob patterns for packages.

### tsconfig.base.json

Shared TypeScript configuration extended by all packages.

### .npmrc

pnpm configuration:
- `shamefully-hoist=true` - Hoist dependencies to node_modules root
- `strict-peer-dependencies=false` - Allow peer dependency resolution

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes to the relevant package(s)
3. Test in the demo app: `pnpm dev`
4. Build: `pnpm build`
5. Submit a pull request

## License

MIT

## Support

- NPM Package: [npmjs.com/@stablecoin/payment-modal](https://www.npmjs.com/package/@stablecoin/payment-modal)
- GitHub Issues: [GitHub](https://github.com/yourusername/stablecoin-payment-modal/issues)
- Documentation: See individual package READMEs

## Roadmap

- [ ] Submit to official shadcn/ui registry
- [ ] Add Stripe integration example
- [ ] Add transaction history component
- [ ] Add currency conversion API
- [ ] Create Figma design system

---

Built with ❤️ using TypeScript, React, and Tailwind CSS
