import React from 'react';

interface TreasuryViewProps {
  balance: string;
}

const TreasuryView: React.FC<TreasuryViewProps> = ({ balance }) => {
  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-semibold">Treasury</h3>
      <div className="text-sm mt-2">
        Balance: {balance} SADL
      </div>
    </div>
  );
};

export default TreasuryView;
