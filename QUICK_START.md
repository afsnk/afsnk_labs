# Quick Start Guide

Get the monorepo up and running in 5 minutes.

## Prerequisites

```bash
node --version   # 18+
pnpm --version   # 9+
```

## 1. Install

```bash
pnpm install
```

## 2. Develop

```bash
pnpm dev
```

Open http://localhost:3000 - Demo app running!

## 3. Build

```bash
pnpm build
```

Output in `packages/npm/dist/`

## 4. Publish

```bash
# Update version
# packages/npm/package.json: "version": "1.0.1"

pnpm publish:npm
```

---

## Common Commands

### Development

```bash
pnpm dev              # Start demo app
pnpm build            # Build all packages
pnpm build:npm        # Build npm package only
pnpm lint             # Run linter
```

### Testing

```bash
# Manual testing in demo app
pnpm dev
# Open http://localhost:3000
# Click "Open Payment Modal"
```

### Publishing

```bash
pnpm publish:npm      # Publish @stablecoin/payment-modal to npm
pnpm publish:registry # Publish registry to npm
```

### Maintenance

```bash
pnpm clean            # Remove dist and node_modules
pnpm add lodash-es    # Add dependency to root
pnpm add -C packages/npm @radix-ui/react-dialog  # Add to npm package
```

---

## Project Structure

```
packages/
├── npm/          # @stablecoin/payment-modal (npm package)
├── registry/     # @stablecoin/registry (shadcn/ui)
└── demo/         # Demo application
```

---

## Documentation

- **[README.md](README.md)** - Project overview
- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[MONOREPO.md](MONOREPO.md)** - Architecture details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

---

## Troubleshooting

### Demo won't start

```bash
pnpm clean
pnpm install
pnpm dev
```

### Package not building

```bash
pnpm build:npm -- --verbose
# Check packages/npm/dist/ for output
```

### Need help?

Check [SETUP.md Troubleshooting](SETUP.md#troubleshooting) section

---

## Next Steps

1. ✅ Run `pnpm install`
2. ✅ Run `pnpm dev`
3. ✅ Click "Open Payment Modal"
4. Read [SETUP.md](SETUP.md) for detailed guide
5. Read [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

---

Happy coding! 🚀
