import { useState, useEffect } from "react";
import { Check, Copy, Wallet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StablecoinPaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  currency?: string;
}

const NETWORKS = [
  { id: "base", name: "Base", symbol: "BASE" },
  { id: "bsc", name: "Binance Smart Chain", symbol: "BSC" },
];

const STABLECOINS = [
  { id: "usdc", name: "USDC", symbol: "USDC" },
  { id: "usdt", name: "Tether", symbol: "USDT" },
];

function generatePaymentAddress(): string {
  // TODO: Refactor to use viem/mnemonic bip39
  const hexChars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return address;
}

export function StablecoinPaymentModal({
  isOpen,
  onOpenChange,
  amount = 100,
  currency = "USD",
}: StablecoinPaymentModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ethereum");
  const [selectedStablecoin, setSelectedStablecoin] = useState<string>("usdc");
  const [paymentAddress, setPaymentAddress] = useState<string>("");
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
    // Simulate wallet connection - in production, integrate with Web3.js or ethers.js
    setTimeout(() => {
      setIsConnecting(false);
      // Handle wallet connection logic here
      console.log("Wallet connection initiated");
    }, 1500);
  };

  const networkName =
    NETWORKS.find((n) => n.id === selectedNetwork)?.name || "Ethereum";
  const stablecoinSymbol =
    STABLECOINS.find((s) => s.id === selectedStablecoin)?.symbol || "USDC";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full border-0 shadow-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-semibold">
            Pay with Stablecoin
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Send {amount} {currency} in {stablecoinSymbol}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Network Selection */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-foreground">
              Blockchain Network
            </label>
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger className="h-11 border border-border bg-background hover:border-accent transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NETWORKS.map((network) => (
                  <SelectItem key={network.id} value={network.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>{network.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stablecoin Selection */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-foreground">
              Stablecoin
            </label>
            <Select
              value={selectedStablecoin}
              onValueChange={setSelectedStablecoin}
            >
              <SelectTrigger className="h-11 border border-border bg-background hover:border-accent transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STABLECOINS.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>{coin.name}</span>
                      <span className="text-muted-foreground text-sm">
                        ({coin.symbol})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Address Section */}
          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-foreground">
              Payment Address
            </label>
            <div className="relative">
              <div className="flex items-center justify-between bg-muted/50 border border-border rounded-lg px-4 py-3 group hover:border-accent/50 transition-colors">
                <code className="font-mono text-sm tracking-wider text-foreground break-all">
                  {paymentAddress}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="ml-2 flex-shrink-0 p-2 rounded-md hover:bg-muted transition-colors"
                  aria-label="Copy address"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-accent" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-accent mt-2 animate-in fade-in">
                  Address copied to clipboard
                </p>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 space-y-1">
            <p className="text-sm font-medium text-foreground">
              Send exactly {amount} {stablecoinSymbol}
            </p>
            <p className="text-xs text-muted-foreground">
              Transaction will be processed on {networkName}. Do not send from
              exchange or other smart contracts.
            </p>
          </div>
        </div>

        {/* Connect Wallet Button */}
        <Button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all active:scale-95"
        >
          {isConnecting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-accent-foreground border-t-transparent animate-spin" />
              <span>Connecting Wallet...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </div>
          )}
        </Button>

        {/* Alternative Payment Text */}
        <p className="text-xs text-center text-muted-foreground pt-2">
          Don't have a wallet?{" "}
          <button className="text-accent hover:underline font-medium">
            Learn more
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
