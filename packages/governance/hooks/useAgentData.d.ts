import { AgentConfig, Decision } from '../../agents/shared/types';
interface AgentData {
    config: AgentConfig;
    status: 'IDLE' | 'BUSY' | 'ERROR';
    recentDecisions: Decision[];
    error?: string;
}
export declare function useAgentData(agentId: string): {
    data: AgentData | null;
    loading: boolean;
    error: string | null;
};
export {};
