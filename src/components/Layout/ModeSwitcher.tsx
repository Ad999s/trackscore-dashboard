
import React, { useState } from 'react';
import { Circle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OperationMode = 'aggressive' | 'balanced' | 'maximum';

interface ModeSwitcherProps {
  className?: string;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ className }) => {
  const [mode, setMode] = useState<OperationMode>('balanced');

  const modes = [
    { 
      id: 'aggressive', 
      color: '#F2FCE2',
      activeColor: '#22c55e',
      label: 'Aggressive Growth', 
      tooltip: 'High Volume, Higher Risk',
      description: 'Focuses on high revenue and only removes critical orders, keeps the maximum volume',
      state: 'live'
    },
    { 
      id: 'balanced', 
      color: '#FEF7CD',
      activeColor: '#f59e0b',
      label: 'Balanced Profit', 
      tooltip: 'Optimized Profit & Scale',
      description: 'Maintains balance between aggressive and maximum profit',
      state: 'live'
    },
    { 
      id: 'maximum', 
      color: '#FEC6A1',
      activeColor: '#ea580c',
      label: 'Maximum Profit', 
      tooltip: 'Low Risk, High Profit',
      description: 'Focuses on maintaining low upfront costs and maximizing net profit',
      state: 'paused'
    }
  ];

  const handleModeChange = (newMode: OperationMode) => {
    setMode(newMode);
  };

  return (
    <div className={cn("flex items-center gap-3 p-1.5 bg-white rounded-lg border border-slate-200 shadow-soft", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button className="group p-1 hover:bg-slate-50 rounded-full">
            <HelpCircle size={16} className="text-slate-400 group-hover:text-slate-600" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="space-y-2">
            <h3 className="font-medium">Operation Modes</h3>
            <p className="text-sm text-slate-500">Select how TrackScore AI should optimize your orders:</p>
            <div className="space-y-3 pt-2">
              {modes.map(modeItem => (
                <div key={modeItem.id} className="flex items-start gap-2">
                  <div 
                    className="w-3 h-3 mt-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: modeItem.activeColor }}
                  />
                  <div>
                    <p className="text-sm font-medium">{modeItem.label} ({modeItem.tooltip})</p>
                    <p className="text-xs text-slate-500">{modeItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <div className="flex items-center gap-1">
        {modes.map((modeItem) => {
          const isActive = mode === modeItem.id;
          return (
            <TooltipProvider key={modeItem.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleModeChange(modeItem.id as OperationMode)}
                    className={cn(
                      "relative w-5 h-5 rounded-full transition-all duration-200",
                      "flex items-center justify-center"
                    )}
                  >
                    <Circle 
                      size={isActive ? 16 : 14} 
                      fill={isActive ? modeItem.activeColor : modeItem.color}
                      color={isActive ? modeItem.activeColor : "transparent"}
                      className="transition-all duration-200"
                    />
                    {modeItem.state === 'paused' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-slate-300 rounded-full border border-white"></span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{modeItem.label}: {modeItem.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSwitcher;
