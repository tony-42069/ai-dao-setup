export interface TreasuryState {
    totalFunds: number;
    allocatedFunds: number;
    availableFunds: number;
}
export interface Proposal {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    votes: {
        for: number;
        against: number;
    };
    timestamp: number;
}
//# sourceMappingURL=proposal.d.ts.map