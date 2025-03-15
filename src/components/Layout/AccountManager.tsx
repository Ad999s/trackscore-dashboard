
import React from 'react';
import { Phone, Mail, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AccountManager = () => {
  // Account manager details would normally come from an API or context
  const accountManager = {
    name: "Rahul Sharma",
    email: "rahul.sharma@trackscore.ai",
    phone: "+91 9876543210"
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-sm hover:bg-transparent">
          <span className="text-muted-foreground">Account Manager:</span>
          <span className="font-medium">{accountManager.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-trackscore-blue/10 flex items-center justify-center">
              <User className="h-6 w-6 text-trackscore-blue" />
            </div>
            <div>
              <h4 className="font-semibold">{accountManager.name}</h4>
              <p className="text-sm text-muted-foreground">Your Dedicated Account Manager</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${accountManager.email}`} className="text-trackscore-blue hover:underline">
                {accountManager.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${accountManager.phone}`} className="text-trackscore-blue hover:underline">
                {accountManager.phone}
              </a>
            </div>
          </div>
          
          <Button className="w-full" variant="outline">
            Schedule a Call
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccountManager;
