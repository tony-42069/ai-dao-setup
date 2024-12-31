export interface TreasuryState {
  totalFunds: number;
  allocatedFunds: number;
  availableFunds: number;
  lastUpdated: number;
  investmentPortfolio: {
    asset: string;
    amount: number;
    value: number;
  }[];
}

export interface Investment {
  asset: string;
  amount: number;
  value: number;
  timestamp: Date;
}
