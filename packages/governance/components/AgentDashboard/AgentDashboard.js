import React, { useState, useEffect } from 'react';
export default function AgentDashboard() {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        // TODO: Fetch agent activities from communication system
        const fetchActivities = async () => {
            setActivities([
                {
                    id: '1',
                    agent: 'CEO',
                    action: 'Created new proposal',
                    timestamp: Date.now()
                },
                {
                    id: '2',
                    agent: 'CFO',
                    action: 'Allocated funds',
                    timestamp: Date.now() - 3600000
                }
            ]);
        };
        fetchActivities();
    }, []);
    return (<div className="agent-dashboard">
      <h2>Agent Activities</h2>
      <div className="grid grid-cols-1 gap-4">
        {activities.map(activity => (<div key={activity.id} className="p-4 border rounded-lg">
            <h3 className="font-bold">{activity.agent}</h3>
            <p>{activity.action}</p>
            <p className="text-sm text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>))}
      </div>
    </div>);
}
