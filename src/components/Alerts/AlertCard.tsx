
import React from 'react';
import { AlertTriangle, Clock, Package, CreditCard, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmployeeSelector from './EmployeeSelector';

export interface Employee {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

export interface AlertItem {
  id: string;
  type: 'warning' | 'info' | 'error' | 'success';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  orderId?: string;
  category: 'delivery' | 'payment' | 'return' | 'refund' | 'system';
  status: 'new' | 'inProgress' | 'reviewing' | 'resolved';
  assignedTo?: Employee | null;
  progress?: number;
}

interface AlertCardProps {
  alert: AlertItem;
  onMove: (alertId: string, direction: 'left' | 'right') => void;
  onDelete: (alertId: string) => void;
  onAssign: (alertId: string, employee: Employee | null) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onMove, onDelete, onAssign }) => {
  // Get the appropriate icon based on alert category
  const getAlertIcon = (category: string, type: string) => {
    switch (category) {
      case 'delivery':
        return <Package className={`h-5 w-5 ${type === 'error' ? 'text-red-500' : 'text-amber-500'}`} />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'return':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'refund':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-slate-500" />;
    }
  };

  // Get background color based on alert status
  const getBackgroundColor = () => {
    switch (alert.status) {
      case 'new':
        return 'bg-blue-50';
      case 'inProgress':
        return 'bg-amber-50';
      case 'reviewing':
        return 'bg-purple-50';
      case 'resolved':
        return 'bg-green-50';
      default:
        return 'bg-white';
    }
  };

  const handleAssign = (employee: Employee | null) => {
    onAssign(alert.id, employee);
  };

  return (
    <div className={`${getBackgroundColor()} border rounded-md p-4 mb-3 shadow-sm group transition-all relative`}>
      <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="destructive" 
          size="sm" 
          className="h-6 w-6 p-0 rounded-full"
          onClick={() => onDelete(alert.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-center">
          {getAlertIcon(alert.category, alert.type)}
          <h3 className="font-medium text-sm">{alert.title}</h3>
        </div>
        <span className="text-xs text-slate-500 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {alert.time}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 mb-3">{alert.message}</p>
      
      {alert.orderId && (
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">
            Order #{alert.orderId}
          </Badge>
        </div>
      )}
      
      {alert.progress !== undefined && (
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-3">
          <div 
            className="bg-green-500 h-1.5 rounded-full" 
            style={{ width: `${alert.progress}%` }}
          ></div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2">
        <EmployeeSelector 
          onAssign={handleAssign}
          assignedEmployee={alert.assignedTo}
        />
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2"
            onClick={() => onMove(alert.id, 'left')}
            disabled={alert.status === 'new'}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2"
            onClick={() => onMove(alert.id, 'right')}
            disabled={alert.status === 'resolved'}
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
