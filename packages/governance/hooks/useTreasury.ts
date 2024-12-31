import { useEffect, useState } from 'react';
import { TreasuryState } from '../types/proposal';

export const useTreasury = () => {
  const [treasury, setTreasury] = useState<TreasuryState>({
    totalFunds: 0,
    allocatedFunds: 0,
    availableFunds: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreasury = async () => {
      try {
        // TODO: Replace with actual API call
        const mockTreasury: TreasuryState = {
          totalFunds: 1000000,
          allocatedFunds: 250000,
          availableFunds: 750000
        };
        
        setTreasury(mockTreasury);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch treasury data');
        setLoading(false);
      }
    };

    fetchTreasury();
  }, []);

  const allocateFunds = async (amount: number) => {
    try {
      // TODO: Replace with actual API call
      setTreasury(prev => ({
        ...prev,
        allocatedFunds: prev.allocatedFunds + amount,
        availableFunds: prev.availableFunds - amount
      }));
    } catch (err) {
      setError('Failed to allocate funds');
    }
  };

  return { treasury, loading, error, allocateFunds };
};
