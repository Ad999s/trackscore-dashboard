
import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Overview of your business metrics and performance
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Welcome to TrackScore</h2>
          <p className="text-slate-600">
            This is your main dashboard. You can view detailed insights and metrics in the DashboardV2 page.
          </p>
          <div className="mt-4">
            <a 
              href="/dashboard-v2" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard V2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
