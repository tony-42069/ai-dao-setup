import React, { useState, useEffect } from 'react';
export default function ProposalList() {
    const [proposals, setProposals] = useState([]);
    useEffect(() => {
        // TODO: Fetch proposals from smart contract
        const fetchProposals = async () => {
            // Mock data for now
            setProposals([
                {
                    id: 1,
                    description: 'Upgrade AI agent framework',
                    status: 'Active',
                    votesFor: 120,
                    votesAgainst: 45
                }
            ]);
        };
        fetchProposals();
    }, []);
    return (<div className="proposal-list">
      <h2>Governance Proposals</h2>
      <div className="grid grid-cols-1 gap-4">
        {proposals.map(proposal => (<div key={proposal.id} className="p-4 border rounded-lg">
            <h3 className="font-bold">{proposal.description}</h3>
            <div className="mt-2">
              <span className="text-sm">Status: {proposal.status}</span>
              <div className="mt-1">
                <span className="text-green-500">For: {proposal.votesFor}</span>
                <span className="ml-2 text-red-500">Against: {proposal.votesAgainst}</span>
              </div>
            </div>
          </div>))}
      </div>
    </div>);
}
