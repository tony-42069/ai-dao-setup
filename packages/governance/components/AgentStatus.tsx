import React from 'react';

interface AgentStatusProps {
  agents: Array<{
    address: string;
    status: string;
    lastActive: Date;
  }>;
}

const AgentStatus: React.FC<AgentStatusProps> = ({ agents }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">AI Agents</h3>
      {agents.map((agent) => (
        <div key={agent.address} className="p-2 border rounded">
          <div className="text-sm">{agent.address}</div>
          <div className="text-xs text-gray-500">
            Status: {agent.status} | Last Active: {agent.lastActive.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentStatus;
