
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CutOffQualityProps {
  initialValue: number;
  onValueChange: (value: number) => void;
}

const CutOffQuality: React.FC<CutOffQualityProps> = ({ 
  initialValue = 75, 
  onValueChange 
}) => {
  const [quality, setQuality] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(initialValue.toString());
  const [mode, setMode] = useState<'edit' | 'auto'>('edit');
  
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
  
  return (
    <div className="glass-card p-4 flex flex-col h-full animate-scale-in">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-trackscore-text text-center">Set Threshold</h2>
      </div>
      
      <div className="flex items-center justify-center my-2">
        {isEditing ? (
          <div className="relative">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-5xl font-bold text-center w-24 bg-transparent border-b-2 border-trackscore-blue focus:outline-none"
              maxLength={3}
            />
            <span className="absolute top-0 right-0 text-3xl font-bold text-trackscore-blue">%</span>
          </div>
        ) : (
          <div className="relative">
            <span className="text-5xl font-bold text-trackscore-blue">{quality}</span>
            <span className="text-3xl font-bold text-trackscore-blue">%</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-2">
        <button
          className={cn(
            "flex-1 py-1.5 rounded-lg transition-all duration-250 text-sm font-medium",
            mode === 'edit' 
              ? "bg-trackscore-blue text-white" 
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          )}
          onClick={() => {
            setMode('edit');
            if (mode !== 'edit') {
              setIsEditing(false);
            }
          }}
        >
          EDIT
        </button>
        <button
          className={cn(
            "flex-1 py-1.5 rounded-lg transition-all duration-250 text-sm font-medium",
            mode === 'auto' 
              ? "bg-trackscore-blue text-white" 
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          )}
          onClick={() => {
            setMode('auto');
            setIsEditing(false);
          }}
        >
          AUTO
        </button>
      </div>
      
      {mode === 'edit' && !isEditing && (
        <button
          className="mt-2 text-xs text-trackscore-blue hover:text-trackscore-highlight transition-colors duration-200 self-center"
          onClick={() => setIsEditing(true)}
        >
          Change threshold
        </button>
      )}
    </div>
  );
};

export default CutOffQuality;
