export interface Network {
  id: string;
  name: string;
  symbol: string;
}

export interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
}

export interface StablecoinPaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  currency?: string;
  onConnect?: () => void | Promise<void>;
}
