export interface TreasuryState {
  totalFunds: number;
  allocatedFunds: number;
  availableFunds: number;
  lastUpdated: Date;
  investmentPortfolio: Investment[];
}

export interface Investment {
  name: string;
  value: number;
  riskLevel: 'low' | 'medium' | 'high';
  maturityDate?: Date;
}
