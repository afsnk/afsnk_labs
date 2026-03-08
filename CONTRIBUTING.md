# Contributing to Stablecoin Payment Modal

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the monorepo.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/yourusername/stablecoin-payment-modal.git
cd stablecoin-payment-modal
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Make Changes

See [Development Guidelines](#development-guidelines) below.

### 5. Test Your Changes

```bash
# Start demo app
pnpm dev

# Build all packages
pnpm build

# Run linter
pnpm lint
```

### 6. Submit Pull Request

- Provide a clear title and description
- Reference any related issues
- Include before/after screenshots for UI changes
- Ensure CI passes

## Development Guidelines

### Monorepo Packages

Each package has a specific purpose:

#### npm Package (`packages/npm`)

- **Purpose:** Drop-in React component
- **When to change:** Core component logic, types, or API
- **Rules:**
  - Minimize external dependencies
  - Maintain backward compatibility
  - Update version in package.json
  - Keep TypeScript strict mode enabled

#### Registry (`packages/registry`)

- **Purpose:** shadcn/ui source code component
- **When to change:** When npm package changes
- **Rules:**
  - Mirror npm package implementation
  - Use @/components/ui paths for imports
  - Maintain feature parity with npm version
  - Document any customization opportunities

#### Demo App (`packages/demo`)

- **Purpose:** Showcase both distribution methods
- **When to change:** To demonstrate new features
- **Rules:**
  - Keep minimal - focus on core features
  - Update both npm and shadcn examples
  - Maintain responsive design

### Code Style

- **TypeScript:** Strict mode enabled
- **React:** Functional components with hooks
- **Imports:** Alphabetical, organized by source
- **Naming:** CamelCase for components, kebab-case for files

### Component Development

#### Adding a New Feature

1. **Update Types**

```typescript
// packages/npm/src/types/index.ts
export interface MyNewFeature {
  enabled: boolean;
  callback?: () => void;
}
```

2. **Update Component**

```typescript
// packages/npm/src/components/StablecoinPaymentModal.tsx
interface Props extends MyNewFeature {
  // ... existing props
}

export function StablecoinPaymentModal({ enabled, callback, ...props }: Props) {
  // Implementation
}
```

3. **Update Registry**

Copy changes to `packages/registry/src/stablecoin-payment-modal.tsx`

4. **Update Demo**

Add example usage to `packages/demo/app/page.tsx`

5. **Update READMEs**

Document in `packages/npm/README.md` and `packages/registry/README.md`

### Testing Changes

```bash
# Start demo app
pnpm dev

# Open http://localhost:3000
# Test the feature manually

# Build to catch TypeScript errors
pnpm build

# Test in a real project (optional)
npm pack packages/npm  # Creates tarball for testing
```

### Performance Considerations

- Minimize re-renders using React.memo when appropriate
- Use useCallback for event handlers passed to children
- Lazy load heavy dependencies
- Keep bundle size small (< 50KB gzipped for npm package)

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add dark mode support to payment modal
fix: Resolve address copy button not working in Safari
docs: Update installation instructions
refactor: Simplify network selection logic
test: Add test cases for address generation
```

Format: `<type>: <description>`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code restructuring
- `test` - Tests
- `chore` - Maintenance

## Pull Request Process

1. **Update documentation** if adding new features
2. **Test thoroughly** with `pnpm dev` and `pnpm build`
3. **Keep commits clean** with meaningful messages
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Keep PR focused** on a single concern

### PR Checklist

- [ ] Changes work in demo app
- [ ] `pnpm build` succeeds
- [ ] `pnpm lint` passes
- [ ] TypeScript strict mode enabled
- [ ] Documentation updated
- [ ] Changes mirror across npm and registry packages (if applicable)
- [ ] No console errors or warnings

## Issue Guidelines

### Reporting Bugs

Include:
- Description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser/Node version
- Screenshots (for UI issues)

### Feature Requests

Include:
- Clear description of the feature
- Use case/motivation
- Possible implementation approach
- Any alternatives considered

## Documentation

### Updating READMEs

When updating documentation:

1. **Root README** (`README.md`)
   - Overall project info
   - Monorepo structure
   - Development scripts

2. **Package READMEs** (`packages/*/README.md`)
   - Installation instructions
   - Usage examples
   - API documentation
   - Customization guide

3. **Setup Guide** (`SETUP.md`)
   - Detailed setup instructions
   - Common tasks
   - Troubleshooting

### Code Comments

Use comments for:
- Non-obvious logic
- Complex algorithms
- Important warnings
- Configuration explanations

## Release Process

1. **Update Versions**
   - Bump version in `packages/npm/package.json`
   - Bump version in `packages/registry/package.json`
   - Update root `package.json`

2. **Update CHANGELOG** (if applicable)

3. **Build and Test**
   ```bash
   pnpm clean
   pnpm install
   pnpm build
   pnpm dev  # Manual testing
   ```

4. **Create Release Tag**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

5. **Publish Packages**
   ```bash
   pnpm publish:npm
   pnpm publish:registry
   ```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [pnpm Documentation](https://pnpm.io)

## Getting Help

- Check existing [issues](https://github.com/yourusername/stablecoin-payment-modal/issues)
- Review [SETUP.md](SETUP.md) for common problems
- Ask questions in pull request discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙏
