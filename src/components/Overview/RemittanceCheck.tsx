
import React, { useState } from 'react';
import { CheckCircle, XCircle, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RemittanceRecord {
  id: number;
  plannedDate: Date;
  actualDate: Date | null;
  amount: number;
  status: 'received' | 'pending' | 'delayed';
}

const RemittanceCheck: React.FC = () => {
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const today = new Date();
  
  // Mock data - would be replaced with real data from an API
  const remittanceCycle = {
    frequency: 'Every Monday and Friday',
    daysOffset: 'D+2',
  };
  
  const lastRemittance = {
    plannedDate: new Date(2023, 5, 9), // June 9, 2023
    received: true,
    amount: 24500,
  };
  
  const nextRemittance = {
    plannedDate: addDays(today, 2),
    estimatedAmount: 18750,
  };
  
  const remittanceHistory: RemittanceRecord[] = [
    { id: 1, plannedDate: new Date(2023, 5, 9), actualDate: new Date(2023, 5, 9), amount: 24500, status: 'received' },
    { id: 2, plannedDate: new Date(2023, 5, 5), actualDate: new Date(2023, 5, 5), amount: 31250, status: 'received' },
    { id: 3, plannedDate: new Date(2023, 5, 1), actualDate: new Date(2023, 5, 2), amount: 12780, status: 'delayed' },
    { id: 4, plannedDate: new Date(2023, 4, 26), actualDate: new Date(2023, 4, 26), amount: 28900, status: 'received' },
    { id: 5, plannedDate: new Date(2023, 4, 22), actualDate: new Date(2023, 4, 22), amount: 19350, status: 'received' },
  ];
  
  const toggleLedger = () => {
    setIsLedgerOpen(!isLedgerOpen);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Remittance Status</h2>
        <p className="text-muted-foreground text-sm">Track your COD remittance status and history</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Last Remittance Check</h3>
                {lastRemittance.received ? (
                  <Badge className="bg-green-500 hover:bg-green-600">Received</Badge>
                ) : (
                  <Badge variant="destructive">Not Received</Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>Planned: {format(lastRemittance.plannedDate, 'MMM d, yyyy')}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Amount:</span>
                <span className="text-lg font-bold">₹{lastRemittance.amount.toLocaleString()}</span>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={toggleLedger}
              >
                {isLedgerOpen ? (
                  <>
                    <span>Hide Remittance History</span>
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>View Remittance History</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Next Remittance</h3>
                <Badge variant="outline">Upcoming</Badge>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>Planned: {format(nextRemittance.plannedDate, 'MMM d, yyyy')}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Estimated Amount:</span>
                <span className="text-lg font-bold">₹{nextRemittance.estimatedAmount.toLocaleString()}</span>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Current Cycle:</span>
                  <Badge variant="outline">{remittanceCycle.daysOffset}</Badge>
                </div>
                <div className="text-sm text-slate-600">{remittanceCycle.frequency}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isLedgerOpen && (
        <Card className="border animate-fade-in">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Remittance History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Planned Date</TableHead>
                  <TableHead>Actual Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {remittanceHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{format(record.plannedDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      {record.actualDate 
                        ? format(record.actualDate, 'MMM d, yyyy')
                        : 'Pending'}
                    </TableCell>
                    <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {record.status === 'received' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span>Received</span>
                        </div>
                      )}
                      {record.status === 'pending' && (
                        <div className="flex items-center text-yellow-600">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Pending</span>
                        </div>
                      )}
                      {record.status === 'delayed' && (
                        <div className="flex items-center text-orange-600">
                          <AlertTriangle className="mr-1 h-4 w-4" />
                          <span>Delayed</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RemittanceCheck;
