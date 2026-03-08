import { StablecoinPaymentModal } from "@afsnk/ui";

interface StablecoinPaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  currency?: string;
  onConnect?: () => void | Promise<void>;
}

export function StablePayModal(props: StablecoinPaymentModalProps) {
  return <StablecoinPaymentModal {...props} />;
}
