
import React from 'react';
import { Info, X, AlertTriangle, Ban, Trash2, PackageX } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon?: React.ReactNode;
  change?: number;
  previousValue?: number;
  previousLabel?: string;
  variant?: 'default' | 'highlight' | 'warning' | 'success';
  showInfoButton?: boolean;
  infoText?: string;
  actionButton?: {
    label: string;
    icon: "x" | "trash" | "trash-2" | "ban" | "package-x";
    onClick: () => void;
  };
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  suffix = '',
  icon,
  change,
  previousValue,
  previousLabel = 'Previously',
  variant = 'default',
  showInfoButton = false,
  infoText = '',
  actionButton,
  className
}) => {
  // Determine color based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlight':
        return 'border-blue-200 bg-blue-50/50';
      case 'warning':
        return 'border-orange-200 bg-orange-50/50';
      case 'success':
        return 'border-green-200 bg-green-50/50';
      default:
        return 'border-slate-200 bg-white';
    }
  };
  
  // Determine icon for action button
  const getActionIcon = () => {
    switch (actionButton?.icon) {
      case 'x':
        return <X className="w-4 h-4 mr-1" />;
      case 'trash':
        return <Trash2 className="w-4 h-4 mr-1" />;
      case 'trash-2':
        return <Trash2 className="w-4 h-4 mr-1" />;
      case 'ban':
        return <Ban className="w-4 h-4 mr-1" />;
      case 'package-x':
        return <PackageX className="w-4 h-4 mr-1" />;
      default:
        return <X className="w-4 h-4 mr-1" />;
    }
  };
  
  return (
    <div className={cn(
      "p-6 rounded-lg border shadow-sm",
      getVariantClasses(),
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-slate-900">{title}</h3>
          {showInfoButton && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-1 text-slate-400 hover:text-slate-600">
                    <Info className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{infoText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            "p-2 rounded-full",
            variant === 'warning' ? 'bg-orange-100' : 
            variant === 'highlight' ? 'bg-blue-100' : 
            variant === 'success' ? 'bg-green-100' : 
            'bg-slate-100'
          )}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col">
        <div className="text-3xl font-bold text-slate-900 mb-1">
          {value.toLocaleString()}{suffix}
        </div>
        
        {typeof change !== 'undefined' && (
          <div className="flex items-center text-sm">
            <span className={cn(
              "font-medium",
              change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-slate-600"
            )}>
              {change > 0 ? '+' : ''}{change}{suffix}
            </span>
            <span className="text-slate-500 ml-1">
              vs {previousLabel}: {previousValue}{suffix}
            </span>
          </div>
        )}
        
        {actionButton && variant === 'warning' && (
          <Button 
            variant="destructive" 
            size="sm" 
            className="mt-4 flex items-center justify-center"
            onClick={actionButton.onClick}
          >
            {getActionIcon()}
            {actionButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
