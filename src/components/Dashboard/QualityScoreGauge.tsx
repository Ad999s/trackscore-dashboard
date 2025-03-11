
import React from 'react';
import { CircleCheck } from 'lucide-react';

const QualityScoreGauge = () => {
  const score = 78;
  const circumference = 2 * Math.PI * 45; // r = 45
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Order Quality Score</h3>
      
      <div className="relative">
        <svg className="transform -rotate-90 w-32 h-32">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            strokeWidth="10"
            stroke="#f1f5f9"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            strokeWidth="10"
            stroke="#3B5EE6"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 1s ease-in-out",
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900">{score}</span>
          <span className="text-sm text-slate-500">out of 100</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
          <CircleCheck className="w-4 h-4" />
          <span className="text-sm font-medium">Good Quality</span>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Your order quality is above average
        </p>
      </div>
    </div>
  );
};

export default QualityScoreGauge;
