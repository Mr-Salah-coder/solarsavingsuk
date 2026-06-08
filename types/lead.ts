export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  property_type: 'detached' | 'semi_detached' | 'terrace' | 'flat';
  monthly_bill: number;
  roof_direction: 'south' | 'east' | 'west' | 'north' | 'not_sure';
  battery_interest: boolean;
  estimated_savings: number;
  created_at: string;
}

export interface SavingsCalculation {
  annualSavings: number;
  installCost: number;
  paybackYears: number;
  systemSize: number;
  lifetimeSavings: number;
}
