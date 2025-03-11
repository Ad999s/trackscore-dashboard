
import React from 'react';
import { MessageSquare } from 'lucide-react';
import AskAITab from '@/components/AskAI/AskAITab';

const AskAI = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Ask AI</h1>
          <p className="text-slate-500 mt-1">
            Get personalized suggestions and insights based on your business data
          </p>
        </div>
      </div>
      
      <AskAITab />
    </div>
  );
};

export default AskAI;
