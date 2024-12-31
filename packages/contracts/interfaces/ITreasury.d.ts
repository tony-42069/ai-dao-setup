export interface ITreasury {
  getBalance(): Promise<number>;
  allocateFunds(amount: number, recipient: string): Promise<void>;
  withdrawFunds(amount: number): Promise<void>;
  getState(): Promise<{
    totalFunds: number;
    allocatedFunds: number;
    availableFunds: number;
  }>;
  getInvestmentOptions(): Promise<any>;
}
