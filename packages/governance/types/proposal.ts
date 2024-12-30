<<<<<<< HEAD
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
=======
export interface Proposal {
  id: number;
  description: string;
  status: string;
  votesFor: number;
  votesAgainst: number;
>>>>>>> f47de8e77f02dd3d1876a7302e11a0777644b54b
}
