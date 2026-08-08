import { ContractPaymentInfo } from '../models/contract.model';

const copFormatter = new Intl.NumberFormat('es-CO');

export interface CalculatePaymentInput {
  baseAmount: number;
  extrasAmount: number;
  transportAmount: number;
  discountAmount: number;
  selectedOption: 40 | 50 | 80 | 100 | 'custom' | number;
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
  } else if (input.selectedOption === 50) {
    paidAmount = Math.round((totalAmount * 50) / 100);
  } else if (input.selectedOption === 80) {
    paidAmount = Math.round((totalAmount * 80) / 100);
  } else if (input.selectedOption === 100) {
    paidAmount = totalAmount;
  } else if (typeof input.selectedOption === 'number') {
    paidAmount = Math.round((totalAmount * input.selectedOption) / 100);
  } else {
    paidAmount = Math.min(totalAmount, Math.max(0, input.customPaidAmount || 0));
  }

  const paidPercentage =
    totalAmount > 0 ? Number(((paidAmount / totalAmount) * 100).toFixed(2)) : 0;

  const remainingAmount = Math.max(0, totalAmount - paidAmount);

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
    confirmedBy: input.confirmedBy || 'sistema',
    confirmedAt: new Date().toISOString(),
    belowMinimumOverride: !!input.belowMinimumOverride,
    overrideReason: input.overrideReason || '',
  };
}

export function formatCurrency(amount: number, currency = 'COP'): string {
  const formatted = copFormatter.format(amount || 0);
  return `${currency} $${formatted}`;
}
