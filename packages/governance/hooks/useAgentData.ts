import { useEffect, useState, useCallback } from 'react';
import { AgentConfig, Decision } from '@agents/shared/types';
import { systemEventEmitter, MessageTypes } from '@agents/shared/communication/eventEmitter';
import { log } from '@agents/shared/utils';

// Temporary mock API until actual implementation is ready
const fetchAgentDataFromAPI = async (agentId: string): Promise<AgentData> => {
  return {
    config: {
      role: agentId,
      model: 'gpt-4',
      capabilities: ['decision-making', 'analysis']
    },
    status: 'IDLE',
    recentDecisions: []
  };
};

interface AgentData {
  config: AgentConfig;
  status: 'IDLE' | 'BUSY' | 'ERROR';
  recentDecisions: Decision[];
  error?: string;
}

const isValidStatus = (status: string): status is 'IDLE' | 'BUSY' | 'ERROR' => {
  return ['IDLE', 'BUSY', 'ERROR'].includes(status);
};

export function useAgentData(agentId: string) {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const agentData = await fetchAgentDataFromAPI(agentId);
      setData(agentData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch agent data';
      log(`Error fetching data for agent ${agentId}: ${errorMessage}`, 'error');
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchData();

    const handleStatusUpdate = (update: { agentId: string; status: 'IDLE' | 'BUSY' | 'ERROR' }) => {
      if (update.agentId === agentId && data) {
        if (!isValidStatus(update.status)) {
          log(`Invalid status received: ${update.status}`, 'warn');
          return;
        }
        
        setData(prev => ({
          ...prev!,
          status: update.status
        }));
      }
    };

    const handleDecisionUpdate = (decision: Decision & { agentId: string }) => {
      if (decision.agentId === agentId && data) {
        setData(prev => ({
          ...prev!,
          recentDecisions: [decision, ...(prev?.recentDecisions || []).slice(0, 4)]
        }));
      }
    };

    systemEventEmitter.on(MessageTypes.STATUS_UPDATE, handleStatusUpdate);
    systemEventEmitter.on('DECISION_UPDATE' as MessageTypes, handleDecisionUpdate);

    return () => {
      systemEventEmitter.off(MessageTypes.STATUS_UPDATE, handleStatusUpdate);
      systemEventEmitter.off('DECISION_UPDATE' as MessageTypes, handleDecisionUpdate);
    };
  }, [agentId, data, fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh };
}
