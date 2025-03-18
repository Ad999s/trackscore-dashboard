
import React from 'react';
import { InsightCategory } from '@/types/secondBrain';
import { cn } from '@/lib/utils';

interface InsightCategoryCardProps {
  category: InsightCategory;
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const InsightCategoryCard = ({ 
  category, 
  isSelected, 
  onClick,
  icon
}: InsightCategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300 hover-scale",
        isSelected 
          ? "border-blue-500 bg-blue-50/50 shadow-md" 
          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "rounded-full p-2 transition-colors",
          isSelected 
            ? "bg-blue-100 text-blue-700" 
            : "bg-slate-100 text-slate-700"
        )}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium">{category.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{category.description}</p>
          <div className="mt-3">
            <span className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              isSelected 
                ? "bg-blue-100 text-blue-800" 
                : "bg-slate-100 text-slate-800"
            )}>
              {category.insights.length} insights
            </span>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50"></div>
      )}
    </div>
  );
};

export default InsightCategoryCard;
