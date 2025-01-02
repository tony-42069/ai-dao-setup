import React from 'react';

interface StatusItem {
  text: string;
  done: boolean;
}

interface ComponentStatus {
  title: string;
  status: 'completed' | 'in-progress' | 'critical';
  items: StatusItem[];
}

interface StatusCardProps extends ComponentStatus {}

const StatusCard: React.FC<StatusCardProps> = ({ title, status, items }) => (
  <div className="p-6 bg-slate-800/50 rounded-xl border border-blue-500/20">
    <h3 className="text-xl font-bold mb-4 text-blue-300">{title}</h3>
    <div className="flex items-center mb-4">
      <div className={`w-3 h-3 rounded-full mr-2 ${
        status === 'completed' ? 'bg-green-500' :
        status === 'in-progress' ? 'bg-yellow-500' :
        'bg-red-500'
      }`} />
      <span className="text-blue-200 capitalize">{status}</span>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li 
          key={index}
          className="flex items-center text-blue-100/80 animate-slideIn"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'forwards'
          }}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${
            item.done ? 'bg-green-500/50' : 'bg-slate-500/50'
          }`} />
          {item.text}
        </li>
      ))}
    </ul>
  </div>
);

const LaunchDashboard: React.FC = () => {
  const components: ComponentStatus[] = [
    {
      title: "Core Smart Contracts",
      status: "in-progress",
      items: [
        { text: "SADL token deployment", done: true },
        { text: "Basic governance mechanisms", done: true },
        { text: "Treasury management", done: false },
        { text: "Integration testing", done: false }
      ]
    },
    {
      title: "AI Agent Framework",
      status: "critical",
      items: [
        { text: "Message bus implementation", done: true },
        { text: "Decision pipeline", done: false },
        { text: "Error handling", done: false },
        { text: "Performance monitoring", done: false }
      ]
    },
    {
      title: "Governance Interface",
      status: "in-progress",
      items: [
        { text: "Landing page updates", done: true },
        { text: "Token information display", done: true },
        { text: "Voting interface", done: false },
        { text: "Treasury view", done: false }
      ]
    },
    {
      title: "Integration & Testing",
      status: "critical",
      items: [
        { text: "Slack integration fixes", done: false },
        { text: "Cross-component testing", done: false },
        { text: "Security audit", done: false },
        { text: "Performance testing", done: false }
      ]
    }
  ];

  return (
    <div className="p-8">
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-1rem);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slideIn {
            opacity: 0;
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
      <h2 className="text-2xl font-bold mb-8 text-blue-200">Launch Status Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {components.map((component, index) => (
          <StatusCard key={index} {...component} />
        ))}
      </div>
    </div>
  );
};

export default LaunchDashboard;