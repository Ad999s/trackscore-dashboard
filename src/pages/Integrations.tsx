
import React from 'react';
import { Link2 } from 'lucide-react';
import IntegrationTab from '@/components/Integrations/IntegrationTab';

const Integrations = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Integrations</h1>
          <p className="text-slate-500 mt-1">
            Connect your shipping providers and marketing platforms
          </p>
        </div>
      </div>
      
      <IntegrationTab />
    </div>
  );
};

export default Integrations;
