# @stablecoin/payment-modal

A minimal, modern stablecoin payment modal component for React applications. Provides users with a frictionless way to pay using USDC, USDT, or DAI on multiple blockchain networks.

## Features

- 🎯 Clean, modern modal interface
- 🔗 Support for 5 major blockchains (Ethereum, Polygon, Base, Arbitrum, Optimism)
- 💵 Multiple stablecoin options (USDC, USDT, DAI)
- 📋 Auto-generated payment addresses
- 📱 Fully responsive design
- 🎨 Dark mode support
- ♿ Accessibility-first approach
- 🚀 Zero external dependencies (except React)

## Installation

```bash
npm install @stablecoin/payment-modal

# or with yarn
yarn add @stablecoin/payment-modal

# or with pnpm
pnpm add @stablecoin/payment-modal
```

## Usage

```tsx
'use client';

import { useState } from 'react';
import { StablecoinPaymentModal } from '@stablecoin/payment-modal';

export default function PaymentPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = async () => {
    // Integrate with Web3.js, ethers.js, or wagmi
    // to connect wallet and process payment
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

## Props

```typescript
interface StablecoinPaymentModalProps {
  isOpen: boolean;           // Controls modal visibility
  onOpenChange: (open: boolean) => void;  // Called when modal state changes
  amount?: number;           // Payment amount (default: 100)
  currency?: string;         // Currency display (default: 'USD')
  onConnect?: () => void | Promise<void>;  // Called when wallet connect button is clicked
}
```

## Supported Networks

- Ethereum
- Polygon
- Base
- Arbitrum
- Optimism

## Supported Stablecoins

- USDC
- USDT (Tether)
- DAI

## Styling

The component uses inline styles and doesn't require Tailwind CSS to be installed. However, for optimal theming, you can customize colors by modifying the component.

## Web3 Integration

To complete the payment flow, integrate with a Web3 library:

### Using ethers.js
```tsx
import { BrowserProvider } from 'ethers';

const handleConnect = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  // Process payment
};
```

### Using wagmi
```tsx
import { useAccount, useConnect } from 'wagmi';

const handleConnect = async () => {
  // Use wagmi hooks for wallet connection
};
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/yourusername/stablecoin-payment-modal).
