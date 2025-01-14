import React from 'react';
import { Proposal } from '@sadellari/contracts/types/contracts';

interface ProposalListProps {
  proposals: Proposal[];
}

const ProposalList: React.FC<ProposalListProps> = ({ proposals }) => {
  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="p-4 border rounded-lg">
          <h3 className="font-bold">{proposal.title}</h3>
          <p className="text-sm text-gray-600">{proposal.description}</p>
          <div className="mt-2 text-sm">
            <span>Status: {proposal.status}</span>
            <span className="ml-4">Votes: {proposal.votes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalList;
