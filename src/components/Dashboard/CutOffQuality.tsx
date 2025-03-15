
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CutOffQualityProps {
  initialValue: number;
  onValueChange: (value: number) => void;
}

const CutOffQuality: React.FC<CutOffQualityProps> = ({ 
  initialValue = 75, 
  onValueChange 
}) => {
  const [quality, setQuality] = useState(initialValue);
  const [mode, setMode] = useState<'aggressive' | 'balanced' | 'maximum'>('balanced');
  
  // Set threshold based on the mode
  useEffect(() => {
    let thresholdValue = 75; // default balanced mode
    
    if (mode === 'aggressive') {
      thresholdValue = 30; // low threshold for aggressive growth
    } else if (mode === 'maximum') {
      thresholdValue = 95; // high threshold for maximum profit
    }
    
    setQuality(thresholdValue);
    onValueChange(thresholdValue);
  }, [mode, onValueChange]);
  
  return (
    <div className="glass-card p-4 flex flex-col h-full animate-scale-in">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold text-trackscore-text">Choose Set Mode</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-trackscore-blue">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-[250px]">
              <p className="text-xs">Choose the mode that best fits your business goals</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="text-5xl font-bold text-trackscore-blue">
          {quality}<span className="text-3xl">%</span>
        </div>
      </div>
      
      <RadioGroup 
        value={mode} 
        onValueChange={(value) => setMode(value as 'aggressive' | 'balanced' | 'maximum')}
        className="space-y-3"
      >
        <div className={cn(
          "relative flex items-center p-3 rounded-lg transition-all duration-200",
          mode === 'aggressive' ? "bg-orange-50 border border-orange-200" : "bg-white border border-slate-200 hover:border-slate-300"
        )}>
          <RadioGroupItem value="aggressive" id="aggressive" className={mode === 'aggressive' ? "text-orange-500" : ""} />
          <div className="ml-3 space-y-1">
            <Label htmlFor="aggressive" className="font-medium">Aggressive Growth Mode</Label>
            <p className="text-xs text-slate-500">Focuses on high revenue, only removes critical orders</p>
          </div>
        </div>
        
        <div className={cn(
          "relative flex items-center p-3 rounded-lg transition-all duration-200",
          mode === 'balanced' ? "bg-blue-50 border border-blue-200" : "bg-white border border-slate-200 hover:border-slate-300"
        )}>
          <RadioGroupItem value="balanced" id="balanced" className={mode === 'balanced' ? "text-blue-500" : ""} />
          <div className="ml-3 space-y-1">
            <Label htmlFor="balanced" className="font-medium">Balanced Profit Mode</Label>
            <p className="text-xs text-slate-500">Maintains balance between growth and profit</p>
          </div>
        </div>
        
        <div className={cn(
          "relative flex items-center p-3 rounded-lg transition-all duration-200",
          mode === 'maximum' ? "bg-green-50 border border-green-200" : "bg-white border border-slate-200 hover:border-slate-300"
        )}>
          <RadioGroupItem value="maximum" id="maximum" className={mode === 'maximum' ? "text-green-500" : ""} />
          <div className="ml-3 space-y-1">
            <Label htmlFor="maximum" className="font-medium">Maximum Profit Mode</Label>
            <p className="text-xs text-slate-500">Focuses on low costs and maximizing net profit</p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default CutOffQuality;
