import { SavingsCalculation } from '@/types/lead';

export function calculateSavings(monthlyBill: number): SavingsCalculation {
  const annualBill = monthlyBill * 12;
  
  // Assume 65% savings from solar panels
  const annualSavings = Math.round(annualBill * 0.65);
  
  // Installation cost: £55 per £1 of monthly bill
  const installCost = Math.round(monthlyBill * 55);
  
  // Calculate system size (kW) - roughly 1 kW per £100 of monthly bill
  const systemSize = Math.round((monthlyBill / 100) * 10) / 10;
  
  // Payback period in years
  const paybackYears = Number((installCost / annualSavings).toFixed(1));
  
  // Assume 25-year lifespan
  const lifetimeSavings = Math.round(annualSavings * 25);
  
  return {
    annualSavings,
    installCost,
    paybackYears,
    systemSize,
    lifetimeSavings,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
