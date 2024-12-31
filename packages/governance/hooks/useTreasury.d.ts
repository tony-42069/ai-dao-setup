import { TreasuryState } from '../types/proposal';
export declare const useTreasury: () => {
    treasury: TreasuryState;
    loading: boolean;
    error: string | null;
    allocateFunds: (amount: number) => Promise<void>;
};
