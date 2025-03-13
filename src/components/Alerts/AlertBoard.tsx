
import React, { useState } from 'react';
import { Plus, CheckCircle, Bell, X, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AlertCard, { AlertItem, Employee } from './AlertCard';

const initialAlerts: AlertItem[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Delayed Delivery',
    message: 'Order #1234 with 3D RC Car is in transit since 14 days.',
    time: '2h ago',
    isRead: false,
    orderId: '1234',
    category: 'delivery',
    status: 'new',
    progress: 40
  },
  {
    id: '2',
    type: 'error',
    title: 'Lost Package',
    message: 'Remote Control Helicopter order #1235 got lost. Contact carrier immediately.',
    time: '5h ago',
    isRead: false,
    orderId: '1235',
    category: 'delivery',
    status: 'new'
  },
  {
    id: '3',
    type: 'info',
    title: 'Payment Failed',
    message: 'Subscription #5678 for RC Drone Series failed. Update payment details.',
    time: '1d ago',
    isRead: true,
    category: 'payment',
    status: 'inProgress',
    assignedTo: { id: 'emp1', name: 'John Doe', initials: 'JD' }
  },
  {
    id: '4',
    type: 'warning',
    title: 'Return Requested',
    message: 'Customer requested return for Remote Car order #2345. Reason: Item damaged.',
    time: '2d ago',
    isRead: true,
    orderId: '2345',
    category: 'return',
    status: 'reviewing',
    assignedTo: { id: 'emp2', name: 'Sarah Chen', initials: 'SC' },
    progress: 65
  },
  {
    id: '5',
    type: 'success',
    title: 'Refund Processed',
    message: 'Refund for RC Model Kit order #3456 has been successfully processed.',
    time: '3d ago',
    isRead: true,
    orderId: '3456',
    category: 'refund',
    status: 'resolved',
    assignedTo: { id: 'emp3', name: 'Mike Johnson', initials: 'MJ' },
    progress: 100
  },
  {
    id: '6',
    type: 'error',
    title: 'Damaged Product',
    message: 'Premium RC Truck received damaged. Customer requesting replacement.',
    time: '6h ago',
    isRead: false,
    orderId: '4567',
    category: 'return',
    status: 'inProgress',
    assignedTo: { id: 'emp4', name: 'Elena Rodriguez', initials: 'ER' },
    progress: 25
  },
  {
    id: '7',
    type: 'warning',
    title: 'Stock Issue',
    message: 'RC Airplane model out of stock but showing available online.',
    time: '12h ago',
    isRead: false,
    category: 'system',
    status: 'new'
  }
];

const AlertBoard = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filterAlerts = (status: string) => {
    return activeFilter === 'all' 
      ? alerts.filter(alert => alert.status === status)
      : alerts.filter(alert => alert.status === status && alert.category === activeFilter);
  };

  const newAlerts = filterAlerts('new');
  const inProgressAlerts = filterAlerts('inProgress');
  const reviewingAlerts = filterAlerts('reviewing');
  const resolvedAlerts = filterAlerts('resolved');

  const handleMoveAlert = (alertId: string, direction: 'left' | 'right') => {
    const statusOrder = ['new', 'inProgress', 'reviewing', 'resolved'];
    
    setAlerts(alerts.map(alert => {
      if (alert.id === alertId) {
        const currentIndex = statusOrder.indexOf(alert.status);
        let newIndex = currentIndex;
        
        if (direction === 'right' && currentIndex < statusOrder.length - 1) {
          newIndex = currentIndex + 1;
        } else if (direction === 'left' && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
        
        return {
          ...alert,
          status: statusOrder[newIndex] as AlertItem['status']
        };
      }
      return alert;
    }));
    
    toast({
      title: "Alert updated",
      description: "The alert has been moved to a new status",
    });
  };

  const handleAssignAlert = (alertId: string, employee: Employee | null) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, assignedTo: employee } 
        : alert
    ));
    
    toast({
      title: employee ? "Alert assigned" : "Assignment removed",
      description: employee 
        ? `This alert has been assigned to ${employee.name}` 
        : "The assignment has been removed from this alert",
    });
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    
    toast({
      title: "Alert deleted",
      description: "The alert has been removed from the board",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Alert Board</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter('all')}
            className={activeFilter === 'all' ? 'bg-slate-200' : ''}
          >
            <Bell className="mr-1 h-4 w-4" />
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter('delivery')}
            className={activeFilter === 'delivery' ? 'bg-slate-200' : ''}
          >
            Delivery
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter('payment')}
            className={activeFilter === 'payment' ? 'bg-slate-200' : ''}
          >
            Payment
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter('return')}
            className={activeFilter === 'return' ? 'bg-slate-200' : ''}
          >
            Returns
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 flex-grow overflow-hidden">
        {/* New Alerts */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2 px-2 py-1 bg-slate-100 rounded-md">
            <div className="flex items-center gap-2">
              <span className="font-bold">New</span>
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {newAlerts.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-y-auto flex-grow p-1">
            {newAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMove={handleMoveAlert}
                onDelete={handleDeleteAlert}
                onAssign={handleAssignAlert}
              />
            ))}
            {newAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md p-4 text-slate-400">
                <span className="text-sm">No alerts</span>
              </div>
            )}
          </div>
        </div>
        
        {/* In Progress */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2 px-2 py-1 bg-slate-100 rounded-md">
            <div className="flex items-center gap-2">
              <span className="font-bold">In Progress</span>
              <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {inProgressAlerts.length}
              </span>
            </div>
          </div>
          <div className="overflow-y-auto flex-grow p-1">
            {inProgressAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMove={handleMoveAlert}
                onDelete={handleDeleteAlert}
                onAssign={handleAssignAlert}
              />
            ))}
            {inProgressAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md p-4 text-slate-400">
                <span className="text-sm">No alerts</span>
              </div>
            )}
          </div>
        </div>
        
        {/* In Review */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2 px-2 py-1 bg-slate-100 rounded-md">
            <div className="flex items-center gap-2">
              <span className="font-bold">In Review</span>
              <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {reviewingAlerts.length}
              </span>
            </div>
          </div>
          <div className="overflow-y-auto flex-grow p-1">
            {reviewingAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMove={handleMoveAlert}
                onDelete={handleDeleteAlert}
                onAssign={handleAssignAlert}
              />
            ))}
            {reviewingAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md p-4 text-slate-400">
                <span className="text-sm">No alerts</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Resolved */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2 px-2 py-1 bg-slate-100 rounded-md">
            <div className="flex items-center gap-2">
              <span className="font-bold">Resolved</span>
              <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {resolvedAlerts.length}
              </span>
            </div>
          </div>
          <div className="overflow-y-auto flex-grow p-1">
            {resolvedAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMove={handleMoveAlert}
                onDelete={handleDeleteAlert}
                onAssign={handleAssignAlert}
              />
            ))}
            {resolvedAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md p-4 text-slate-400">
                <span className="text-sm">No alerts</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBoard;
