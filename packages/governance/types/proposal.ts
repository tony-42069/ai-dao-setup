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
