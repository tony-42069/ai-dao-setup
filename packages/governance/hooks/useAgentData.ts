import { useEffect, useState } from 'react';
import { AgentConfig, Decision } from '../../agents/shared/types';
import { systemEventEmitter, MessageTypes } from '../../agents/shared/communication/eventEmitter';
import { log } from '../../agents/shared/utils';

interface AgentData {
  config: AgentConfig;
  status: 'IDLE' | 'BUSY' | 'ERROR';
  recentDecisions: Decision[];
  error?: string;
}

export function useAgentData(agentId: string) {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        // TODO: Implement actual data fetching from API or blockchain
        const mockData: AgentData = {
          config: {
            role: agentId,
            model: 'gpt-4',
            capabilities: ['decision-making', 'analysis']
          },
          status: 'IDLE',
          recentDecisions: []
        };
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch agent data';
        log(`Error fetching data for agent ${agentId}: ${errorMessage}`, 'error');
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchAgentData();

    const handleStatusUpdate = (update: { agentId: string; status: string }) => {
      if (update.agentId === agentId && data) {
        setData(prev => ({
          ...prev!,
          status: update.status as 'IDLE' | 'BUSY' | 'ERROR'
        }));
      }
    };

    systemEventEmitter.on(MessageTypes.STATUS_UPDATE, handleStatusUpdate);

    return () => {
      systemEventEmitter.off(MessageTypes.STATUS_UPDATE, handleStatusUpdate);
    };
  }, [agentId]);

  return { data, loading, error };
}
