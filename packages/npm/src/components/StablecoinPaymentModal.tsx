'use client';

import { useState, useEffect } from 'react';
import { Check, Copy, Wallet } from 'lucide-react';
import type { StablecoinPaymentModalProps, Network, Stablecoin } from '../types/index';

const NETWORKS: Network[] = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC' },
  { id: 'base', name: 'Base', symbol: 'BASE' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB' },
  { id: 'optimism', name: 'Optimism', symbol: 'OP' },
];

const STABLECOINS: Stablecoin[] = [
  { id: 'usdc', name: 'USDC', symbol: 'USDC' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT' },
  { id: 'dai', name: 'DAI', symbol: 'DAI' },
];

function generatePaymentAddress(): string {
  const hexChars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return address;
}

// Button component (inline to avoid external dependencies)
function Button({
  onClick,
  disabled,
  children,
  className = '',
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-11 bg-[oklch(0.505_0.149_202.53)] hover:bg-[oklch(0.505_0.149_202.53_/_0.9)] text-white font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

// Dialog components (inline)
function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative bg-white dark:bg-slate-950 rounded-lg shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

// Select components (simplified)
function Select({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-11 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 hover:border-[oklch(0.505_0.149_202.53)] transition-colors px-3 py-2 text-left flex items-center justify-between rounded-lg"
      >
        <span className="text-gray-700 dark:text-gray-200">
          {Array.isArray(children) &&
            children.find(
              (child) =>
                typeof child === 'object' &&
                'props' in child &&
                child.props.value === value
            )?.props.children}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function SelectItem({
  value,
  children,
  onSelect,
}: {
  value: string;
  children: React.ReactNode;
  onSelect: (value: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(value)}
      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-800 text-sm text-gray-700 dark:text-gray-200"
    >
      {children}
    </button>
  );
}

export function StablecoinPaymentModal({
  isOpen,
  onOpenChange,
  amount = 100,
  currency = 'USD',
  onConnect,
}: StablecoinPaymentModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('ethereum');
  const [selectedStablecoin, setSelectedStablecoin] = useState<string>('usdc');
  const [paymentAddress, setPaymentAddress] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Generate address when network or stablecoin changes
  useEffect(() => {
    setPaymentAddress(generatePaymentAddress());
    setCopied(false);
  }, [selectedNetwork, selectedStablecoin]);

  const handleCopyAddress = () => {
    if (paymentAddress) {
      navigator.clipboard.writeText(paymentAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      if (onConnect) {
        await onConnect();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const networkName =
    NETWORKS.find((n) => n.id === selectedNetwork)?.name || 'Ethereum';
  const stablecoinSymbol =
    STABLECOINS.find((s) => s.id === selectedStablecoin)?.symbol || 'USDC';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Pay with Stablecoin
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Send {amount} {currency} in {stablecoinSymbol}
          </p>
        </div>

        <div className="space-y-6">
          {/* Network Selection */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Blockchain Network
            </label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full h-11 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 hover:border-[oklch(0.505_0.149_202.53)] transition-colors px-3 py-2 rounded-lg text-gray-900 dark:text-white"
            >
              {NETWORKS.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stablecoin Selection */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Stablecoin
            </label>
            <select
              value={selectedStablecoin}
              onChange={(e) => setSelectedStablecoin(e.target.value)}
              className="w-full h-11 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 hover:border-[oklch(0.505_0.149_202.53)] transition-colors px-3 py-2 rounded-lg text-gray-900 dark:text-white"
            >
              {STABLECOINS.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Address Section */}
          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Payment Address
            </label>
            <div className="relative">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 hover:border-[oklch(0.505_0.149_202.53)]/50 transition-colors">
                <code className="font-mono text-sm tracking-wider text-gray-900 dark:text-gray-100 break-all">
                  {paymentAddress}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="ml-2 flex-shrink-0 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Copy address"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-[oklch(0.505_0.149_202.53)]" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-[oklch(0.505_0.149_202.53)] mt-2">
                  Address copied to clipboard
                </p>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-[oklch(0.505_0.149_202.53)]/10 border border-[oklch(0.505_0.149_202.53)]/20 rounded-lg px-4 py-3 space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Send exactly {amount} {stablecoinSymbol}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Transaction will be processed on {networkName}. Do not send from
              exchange or other smart contracts.
            </p>
          </div>
        </div>

        {/* Connect Wallet Button */}
        <Button
          onClick={handleConnectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Connecting Wallet...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </div>
          )}
        </Button>

        {/* Alternative Payment Text */}
        <p className="text-xs text-center text-gray-600 dark:text-gray-400 pt-2">
          Don't have a wallet?{' '}
          <button className="text-[oklch(0.505_0.149_202.53)] hover:underline font-medium">
            Learn more
          </button>
        </p>
      </div>
    </Dialog>
  );
}
