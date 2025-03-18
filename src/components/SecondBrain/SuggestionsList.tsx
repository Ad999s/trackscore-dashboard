
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Suggestion } from '@/types/secondBrain';
import { cn } from '@/lib/utils';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800',
          icon: 'text-red-500'
        };
      case 'medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
          icon: 'text-amber-500'
        };
      case 'low':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-800',
          icon: 'text-green-500'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {suggestions.map((suggestion) => {
        const colors = getImpactColor(suggestion.impact);
        
        return (
          <div 
            key={suggestion.id}
            className={cn(
              "rounded-xl p-6 border transition-all hover:shadow-md",
              colors.bg,
              colors.border
            )}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className={cn("rounded-full p-1.5", colors.icon)}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className={cn("font-medium text-lg", colors.text)}>
                  {suggestion.title}
                </h3>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  colors.badge
                )}>
                  {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} Impact
                </span>
                <div className="text-xs text-slate-500 mt-1">
                  {suggestion.category}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">
              {suggestion.description}
            </p>
            
            <div className="space-y-2">
              {suggestion.actionItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-slate-400" />
                  <p className="text-sm text-slate-600">{item}</p>
                </div>
              ))}
            </div>
            
            <button 
              className={cn(
                "mt-4 w-full rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-white/50",
                colors.border,
                colors.text
              )}
            >
              Apply this suggestion
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionsList;
