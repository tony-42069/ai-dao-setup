import React from 'react';
import { useProposals, useAgentStatus, useTreasury } from '../hooks';
import ProposalList from './ProposalList';
import AgentStatus from './AgentStatus';
import TreasuryView from './TreasuryView';

const Dashboard = () => {
  const { proposals } = useProposals();
  const { agents } = useAgentStatus();
  const { treasuryBalance } = useTreasury();

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-4">Proposals</h2>
        <ProposalList proposals={proposals} />
      </div>
      
      <div className="col-span-1">
        <h2 className="text-xl font-bold mb-4">System Status</h2>
        <AgentStatus agents={agents} />
        <TreasuryView balance={treasuryBalance} />
      </div>
    </div>
  );
};

export default Dashboard;
