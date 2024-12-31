import { useEffect, useState } from 'react';
import { Proposal } from '../types/proposal';

export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // TODO: Replace with actual API call
        const mockProposals: Proposal[] = [
          {
            id: '1',
            title: 'Example Proposal',
            description: 'This is an example proposal',
            status: 'pending',
            votes: {
              for: 0,
              against: 0
            },
            timestamp: Date.now()
          }
        ];
        
        setProposals(mockProposals);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch proposals');
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const createProposal = async (proposal: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => {
    try {
      // TODO: Replace with actual API call
      const newProposal: Proposal = {
        ...proposal,
        id: (proposals.length + 1).toString(),
        timestamp: Date.now(),
        status: 'pending'
      };
      
      setProposals(prev => [newProposal, ...prev]);
    } catch (err) {
      setError('Failed to create proposal');
    }
  };

  return { proposals, loading, error, createProposal };
};
