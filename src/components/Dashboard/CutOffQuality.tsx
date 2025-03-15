
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CutOffQualityProps {
  initialValue: number;
  onValueChange: (value: number) => void;
}

// Define the operating modes
const modes = [
  {
    id: 'aggressive',
    name: 'Aggressive Growth',
    description: 'Focuses on high revenue and only removes critical orders, keeps the maximum volume.',
    threshold: 85
  },
  {
    id: 'balanced',
    name: 'Balanced Profit',
    description: 'Maintains balance between aggressive and maximum profit.',
    threshold: 70
  },
  {
    id: 'maximum',
    name: 'Maximum Profit',
    description: 'Focuses on maintaining low upfront costs and maximizing net profit.',
    threshold: 50
  }
];

const CutOffQuality: React.FC<CutOffQualityProps> = ({ 
  initialValue = 75, 
  onValueChange 
}) => {
  const [quality, setQuality] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(initialValue.toString());
  const [selectedMode, setSelectedMode] = useState(() => {
    // Determine initial mode based on initialValue
    if (initialValue >= 80) return 'aggressive';
    if (initialValue >= 60) return 'balanced';
    return 'maximum';
  });
  
  const handleSave = () => {
    const newValue = Math.min(100, Math.max(0, parseInt(tempValue) || 0));
    setQuality(newValue);
    onValueChange(newValue);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setTempValue(quality.toString());
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  const handleModeChange = (modeId: string) => {
    setSelectedMode(modeId);
    const mode = modes.find(m => m.id === modeId);
    if (mode) {
      setQuality(mode.threshold);
      onValueChange(mode.threshold);
    }
  };
  
  return (
    <div className="glass-card p-4 flex flex-col h-full animate-scale-in">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-trackscore-text text-center">Choose Mode</h2>
      </div>
      
      <div className="space-y-3 mb-4">
        {modes.map(mode => (
          <div 
            key={mode.id}
            className={cn(
              "relative p-3 rounded-lg cursor-pointer border-2 transition-all",
              selectedMode === mode.id 
                ? "border-trackscore-blue bg-slate-50" 
                : "border-slate-200 hover:border-slate-300"
            )}
            onClick={() => handleModeChange(mode.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "font-medium",
                selectedMode === mode.id ? "text-trackscore-blue" : "text-slate-700"
              )}>
                {mode.name}
              </h3>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60 text-sm">{mode.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="mt-1 text-xs text-slate-500 line-clamp-1">
              {mode.description}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center my-3">
        {isEditing ? (
          <div className="relative">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-4xl font-bold text-center w-24 bg-transparent border-b-2 border-trackscore-blue focus:outline-none"
              maxLength={3}
            />
            <span className="absolute top-0 right-0 text-2xl font-bold text-trackscore-blue">%</span>
          </div>
        ) : (
          <div className="relative">
            <span className="text-4xl font-bold text-trackscore-blue">{quality}</span>
            <span className="text-2xl font-bold text-trackscore-blue">%</span>
          </div>
        )}
      </div>
      
      {!isEditing && (
        <button
          className="mt-2 text-xs text-trackscore-blue hover:text-trackscore-highlight transition-colors duration-200 self-center"
          onClick={() => setIsEditing(true)}
        >
          Manually adjust threshold
        </button>
      )}
    </div>
  );
};

export default CutOffQuality;
