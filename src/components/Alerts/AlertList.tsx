
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Package, Bell, Trash2, Clock, CreditCard } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Sample alert data structure
interface AlertItem {
  id: string;
  type: 'warning' | 'info' | 'error' | 'success';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  orderId?: string;
  category: 'delivery' | 'payment' | 'return' | 'refund' | 'system';
}

const AlertList = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Delayed Delivery',
      message: 'Order #1234 is in transit since 14 days and undelivered.',
      time: '2h ago',
      isRead: false,
      orderId: '1234',
      category: 'delivery'
    },
    {
      id: '2',
      type: 'error',
      title: 'Lost Package',
      message: 'Order #1234 got lost in misroute. Contact carrier immediately.',
      time: '5h ago',
      isRead: false,
      orderId: '1234',
      category: 'delivery'
    },
    {
      id: '3',
      type: 'info',
      title: 'Payment Failed',
      message: 'Recurring payment for subscription #5678 failed. Please update payment details.',
      time: '1d ago',
      isRead: true,
      category: 'payment'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Return Requested',
      message: 'Customer requested return for order #2345. Reason: Item damaged.',
      time: '2d ago',
      isRead: true,
      orderId: '2345',
      category: 'return'
    },
    {
      id: '5',
      type: 'success',
      title: 'Refund Processed',
      message: 'Refund for order #3456 has been successfully processed.',
      time: '3d ago',
      isRead: true,
      orderId: '3456',
      category: 'refund'
    }
  ]);

  // Get counts
  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  
  // Filter by category
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.category === activeFilter || 
        (activeFilter === 'unread' && !alert.isRead));

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
    
    toast({
      title: "Alert marked as resolved",
      description: "This notification won't appear as new anymore",
    });
  };

  const clearAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert removed",
      description: "This notification has been cleared from your list",
    });
  };

  const clearAllAlerts = () => {
    setAlerts([]);
    
    toast({
      title: "All alerts cleared",
      description: "Your notification list is now empty",
    });
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })));
    
    toast({
      title: "All alerts marked as resolved",
      description: "All notifications have been marked as read",
    });
  };

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
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Alerts</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full px-2.5">
              {unreadCount} new
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllAlerts}
            disabled={alerts.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button 
          variant={activeFilter === 'all' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setActiveFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={activeFilter === 'unread' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setActiveFilter('unread')}
        >
          Unread
        </Button>
        <Button 
          variant={activeFilter === 'delivery' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setActiveFilter('delivery')}
        >
          <Package className="mr-2 h-4 w-4" />
          Delivery
        </Button>
        <Button 
          variant={activeFilter === 'payment' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setActiveFilter('payment')}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Payment
        </Button>
        <Button 
          variant={activeFilter === 'return' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setActiveFilter('return')}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Returns
        </Button>
        <Button 
          variant={activeFilter === 'refund' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setActiveFilter('refund')}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Refunds
        </Button>
      </div>
      
      {filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow py-16 text-center bg-slate-50 rounded-lg border border-slate-200">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">All clear!</h3>
          <p className="text-slate-500 max-w-md">
            Everything is running smoothly. No alerts to display at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto flex-grow">
          {filteredAlerts.map(alert => (
            <Alert 
              key={alert.id} 
              className={`transition-colors ${!alert.isRead ? 'bg-slate-50 border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {getAlertIcon(alert.category, alert.type)}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <AlertTitle className={`${!alert.isRead ? 'font-bold' : ''}`}>{alert.title}</AlertTitle>
                    <span className="text-xs text-slate-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                  
                  <AlertDescription className="mt-1">
                    {alert.message}
                  </AlertDescription>
                  
                  {alert.orderId && (
                    <div className="mt-2">
                      <Badge variant="outline" className="rounded-sm">
                        Order #{alert.orderId}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-3">
                {!alert.isRead && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => markAsRead(alert.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark as resolved
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => clearAlert(alert.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertList;
