import { ContractPaymentInfo } from '../models/contract.model';

const copFormatter = new Intl.NumberFormat('es-CO');

export interface CalculatePaymentInput {
  baseAmount: number;
  extrasAmount: number;
  transportAmount: number;
  discountAmount: number;
  selectedOption: 40 | 80 | 100 | 'custom';
  customPaidAmount?: number;
  currency?: string;
  confirmedBy: string;
  belowMinimumOverride?: boolean;
  overrideReason?: string;
}

export function calculatePaymentInfo(input: CalculatePaymentInput): ContractPaymentInfo {
  const baseAmount = Math.max(0, input.baseAmount || 0);
  const extrasAmount = Math.max(0, input.extrasAmount || 0);
  const transportAmount = Math.max(0, input.transportAmount || 0);
  const discountAmount = Math.max(0, input.discountAmount || 0);

  const totalAmount = Math.max(0, baseAmount + extrasAmount + transportAmount - discountAmount);

  let paidAmount = 0;

  if (input.selectedOption === 40) {
    paidAmount = Math.round((totalAmount * 40) / 100);
  } else if (input.selectedOption === 80) {
    paidAmount = Math.round((totalAmount * 80) / 100);
  } else if (input.selectedOption === 100) {
    paidAmount = totalAmount;
  } else {
    paidAmount = Math.min(totalAmount, Math.max(0, input.customPaidAmount || 0));
  }

  const paidPercentage =
    totalAmount > 0 ? Number(((paidAmount / totalAmount) * 100).toFixed(2)) : 0;

  const remainingAmount = Math.max(0, totalAmount - paidAmount);

  const now = new Date().toISOString();

  return {
    currency: input.currency || 'COP',
    baseAmount,
    extrasAmount,
    transportAmount,
    discountAmount,
    totalAmount,
    paidAmount,
    paidPercentage,
    remainingAmount,
    selectedOption: input.selectedOption,
    confirmedManually: true,
    confirmedBy: input.confirmedBy || 'admin',
    confirmedAt: now,
    belowMinimumOverride: !!input.belowMinimumOverride,
    overrideReason: input.belowMinimumOverride ? input.overrideReason || 'Aprobado por administración' : undefined,
  };
}

export function isPaymentValidForSign(payment: ContractPaymentInfo): boolean {
  if (payment.totalAmount <= 0) {
    return false;
  }

  if (payment.belowMinimumOverride && payment.overrideReason?.trim()) {
    return true;
  }

  return payment.paidPercentage >= 39.99;
}

export function formatCurrency(amount: number, currency = 'COP'): string {
  if (currency === 'COP') {
    return `$${copFormatter.format(amount)} COP`;
  }
  return `${currency} $${copFormatter.format(amount)}`;
}
