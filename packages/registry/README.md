# @stablecoin/registry

shadcn/ui component registry for the stablecoin payment modal component.

## Installation

### Using the default shadcn registry

To use the stablecoin payment modal with shadcn/ui, run:

```bash
npx shadcn@latest add stablecoin-payment-modal
```

### Using a custom registry (advanced)

If you're self-hosting this registry, add it to your `components.json`:

```json
{
  "registries": [
    "https://ui.shadcn.com/r",
    "https://your-custom-registry.com"
  ]
}
```

Then run:

```bash
npx shadcn@latest add stablecoin-payment-modal
```

## Component

The registry includes:

- **stablecoin-payment-modal** - A minimal, modern payment modal for blockchain transactions

### Dependencies

The component requires:
- `@radix-ui/react-dialog` - Dialog primitive
- `@radix-ui/react-select` - Select primitive
- `lucide-react` - Icons

And it assumes you have shadcn/ui components:
- `button`
- `dialog`
- `select`

These will be automatically installed when you add the component.

## Usage

After adding the component to your project:

```tsx
'use client';

import { useState } from 'react';
import { StablecoinPaymentModal } from '@/components/stablecoin-payment-modal';

export default function PaymentPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = async () => {
    // Integrate with Web3.js, ethers.js, or wagmi
    console.log('Wallet connection initiated');
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Pay with Stablecoin
      </button>

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

## Component Props

```typescript
interface StablecoinPaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;           // Default: 100
  currency?: string;         // Default: 'USD'
  onConnect?: () => void | Promise<void>;
}
```

## Features

- 🎯 Clean, modern modal interface
- 🔗 Support for 5 major blockchains
- 💵 Multiple stablecoin options
- 📋 Auto-generated payment addresses
- 📱 Fully responsive design
- 🎨 Dark mode support
- ♿ Fully accessible
- 🎨 Customizable with Tailwind CSS

## Customization

Since shadcn/ui components are copied to your project, you can fully customize the component:

1. **Colors**: Update the Tailwind classes to match your brand
2. **Layout**: Modify the structure as needed
3. **Functionality**: Add additional features like transaction history

Example customization:

```tsx
// Customize colors and styling
<Dialog open={isOpen} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-lg bg-blue-50">
    {/* Customize as needed */}
  </DialogContent>
</Dialog>
```

## Web3 Integration

To complete the payment flow, integrate with a Web3 library:

```tsx
import { BrowserProvider } from 'ethers';

const handleConnect = async () => {
  if (window.ethereum) {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    // Process payment with connected account
  }
};
```

## Support

For issues and questions, please open an issue on GitHub.

## License

MIT
