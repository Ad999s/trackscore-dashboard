
import React from 'react';
import CashflowComparison from '@/components/PnL/CashflowComparison';

const CashflowCompanion = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-trackscore-text">Cashflow Companion</h1>
        <p className="text-slate-500 mt-1">
          Analyze and compare cashflow patterns to optimize your business operations
        </p>
      </div>
      
      <CashflowComparison />
    </div>
  );
};

export default CashflowCompanion;
