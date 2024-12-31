import { useEffect, useState } from 'react';
import { Proposal } from '../types/proposal';
import { systemEventEmitter, MessageTypes } from '../../agents/shared/communication/eventEmitter';
import { log } from '../../agents/shared/utils';

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // TODO: Implement actual data fetching from API or blockchain
        const mockProposals: Proposal[] = [
          {
            id: '1',
            title: 'Increase Treasury Reserve',
            description: 'Proposal to increase the treasury reserve by 10%',
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
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch proposals';
        log(`Error fetching proposals: ${errorMessage}`, 'error');
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchProposals();

    const handleNewProposal = (proposal: Proposal) => {
      setProposals(prev => [proposal, ...prev]);
    };

    systemEventEmitter.on(MessageTypes.NEW_PROPOSAL, handleNewProposal);

    return () => {
      systemEventEmitter.off(MessageTypes.NEW_PROPOSAL, handleNewProposal);
    };
  }, []);

  return { proposals, loading, error };
}
