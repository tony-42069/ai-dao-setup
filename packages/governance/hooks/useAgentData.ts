import { useEffect, useState } from 'react';
import { systemEventEmitter } from '../../agents/shared/communication/eventEmitter';
import { MessageTypes } from '../../agents/shared/communication/protocolTypes';

interface AgentData {
  id: string;
  status: 'IDLE' | 'BUSY' | 'ERROR';
  lastActivity: string;
  decisionsMade: number;
}

export const useAgentData = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);

  useEffect(() => {
    const handleStatusUpdate = (data: {
      agentId: string;
      status: 'IDLE' | 'BUSY' | 'ERROR';
      details?: string;
    }) => {
      setAgents(prev => {
        const existing = prev.find(a => a.id === data.agentId);
        if (existing) {
          return prev.map(a => 
            a.id === data.agentId 
              ? { ...a, status: data.status, lastActivity: new Date().toISOString() }
              : a
          );
        }
        return [...prev, {
          id: data.agentId,
          status: data.status,
          lastActivity: new Date().toISOString(),
          decisionsMade: 0
        }];
      });
    };

    systemEventEmitter.on(MessageTypes.STATUS_UPDATE, handleStatusUpdate);

    return () => {
      systemEventEmitter.off(MessageTypes.STATUS_UPDATE, handleStatusUpdate);
    };
  }, []);

  return { agents };
};
