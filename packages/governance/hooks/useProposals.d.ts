import { Proposal } from '../types/proposal';
export declare function useProposals(): {
    proposals: Proposal[];
    loading: boolean;
    error: string | null;
};
