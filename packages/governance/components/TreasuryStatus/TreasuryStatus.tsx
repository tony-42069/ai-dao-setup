import React, { useState, useEffect } from 'react';

interface TreasuryStatus {
  totalFunds: number;
  allocatedFunds: number;
  availableFunds: number;
}

export default function TreasuryStatus() {
  const [status, setStatus] = useState<TreasuryStatus>({
    totalFunds: 0,
    allocatedFunds: 0,
    availableFunds: 0
  });

  useEffect(() => {
    // TODO: Fetch treasury status from smart contract
    const fetchStatus = async () => {
      setStatus({
        totalFunds: 1000000,
        allocatedFunds: 250000,
        availableFunds: 750000
      });
    };

    fetchStatus();
  }, []);

  return (
    <div className="treasury-status">
      <h2>Treasury Status</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Total Funds</h3>
          <p className="text-xl">${status.totalFunds.toLocaleString()}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Allocated Funds</h3>
          <p className="text-xl">${status.allocatedFunds.toLocaleString()}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Available Funds</h3>
          <p className="text-xl">${status.availableFunds.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
