import { useEffect, useState } from 'react';
import { systemEventEmitter, MessageTypes } from '../../agents/shared/communication/eventEmitter';
import { log } from '../../agents/shared/utils';
export function useAgentData(agentId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                // TODO: Implement actual data fetching from API or blockchain
                const mockData = {
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
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch agent data';
                log(`Error fetching data for agent ${agentId}: ${errorMessage}`, 'error');
                setError(errorMessage);
                setLoading(false);
            }
        };
        fetchAgentData();
        const handleStatusUpdate = (update) => {
            if (update.agentId === agentId && data) {
                setData(prev => ({
                    ...prev,
                    status: update.status
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
