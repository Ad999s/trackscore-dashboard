
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
    <div className="glass-card p-6 flex flex-col h-full animate-scale-in">
      <div className="flex flex-col">
        <h3 className="text-sm text-slate-500 font-medium uppercase tracking-wide">Cut-Off</h3>
        <h2 className="text-xl font-semibold text-trackscore-text mt-1">Order Quality</h2>
      </div>
      
      <div className="flex items-center justify-center flex-grow my-4">
        {isEditing ? (
          <div className="relative">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-6xl font-bold text-center w-32 bg-transparent border-b-2 border-trackscore-blue focus:outline-none"
              maxLength={3}
            />
            <span className="absolute top-0 right-0 text-4xl font-bold text-trackscore-blue">%</span>
          </div>
        ) : (
          <div className="relative">
            <span className="text-6xl font-bold text-trackscore-blue">{quality}</span>
            <span className="text-4xl font-bold text-trackscore-blue">%</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          className={cn(
            "flex-1 py-2 rounded-lg transition-all duration-250 text-sm font-medium",
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
            "flex-1 py-2 rounded-lg transition-all duration-250 text-sm font-medium",
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
          className="mt-3 text-sm text-trackscore-blue hover:text-trackscore-highlight transition-colors duration-200 self-center"
          onClick={() => setIsEditing(true)}
        >
          Change threshold
        </button>
      )}
    </div>
  );
};

export default CutOffQuality;
