
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Truck, Facebook, PlusCircle, Settings, RefreshCw, ArrowRight, Link2 } from 'lucide-react';

const shippingProviders = [
  { id: 'fedex', name: 'FedEx', logo: 'https://placehold.co/100x50?text=FedEx' },
  { id: 'dhl', name: 'DHL', logo: 'https://placehold.co/100x50?text=DHL' },
  { id: 'bluedart', name: 'BlueDart', logo: 'https://placehold.co/100x50?text=BlueDart' },
  { id: 'dtdc', name: 'DTDC', logo: 'https://placehold.co/100x50?text=DTDC' },
  { id: 'delhivery', name: 'Delhivery', logo: 'https://placehold.co/100x50?text=Delhivery' },
];

const adPlatforms = [
  { id: 'facebook', name: 'Facebook Ads', logo: 'https://placehold.co/100x50?text=Facebook' },
  { id: 'instagram', name: 'Instagram Ads', logo: 'https://placehold.co/100x50?text=Instagram' },
  { id: 'google', name: 'Google Ads', logo: 'https://placehold.co/100x50?text=Google' },
];

type IntegrationType = 'shipping' | 'marketing';

interface IntegrationCardProps {
  id: string;
  name: string;
  logo: string;
  type: IntegrationType;
  onConnect: (id: string, type: IntegrationType) => void;
}

const IntegrationCard = ({ id, name, logo, type, onConnect }: IntegrationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <img src={logo} alt={name} className="h-10 object-contain" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {type === 'shipping' 
            ? 'Connect to track shipments in real-time'
            : 'Import campaign performance metrics'}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 flex justify-end">
        <Button 
          size="sm" 
          variant="outline"
          className="gap-2" 
          onClick={() => onConnect(id, type)}
        >
          <Link2 className="h-4 w-4" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

const IntegrationTab = () => {
  const [activeTab, setActiveTab] = useState<IntegrationType>('shipping');
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);
  const [connectingType, setConnectingType] = useState<IntegrationType | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const [autoSync, setAutoSync] = useState(true);
  
  const handleConnect = (id: string, type: IntegrationType) => {
    setConnectingProvider(id);
    setConnectingType(type);
  };
  
  const handleSubmitCredentials = () => {
    if (!apiKey || !accountId) {
      toast.error('Please provide all required credentials');
      return;
    }
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Connecting to ${connectingProvider}...`,
        success: () => {
          setConnectingProvider(null);
          setConnectingType(null);
          setApiKey('');
          setAccountId('');
          return `Successfully connected to ${connectingProvider}!`;
        },
        error: 'Failed to connect. Please check your credentials.',
      }
    );
  };
  
  const handleCancelConnect = () => {
    setConnectingProvider(null);
    setConnectingType(null);
    setApiKey('');
    setAccountId('');
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Integrations
        </CardTitle>
        <CardDescription>
          Connect your shipping providers and marketing platforms
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {connectingProvider ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Connect to {connectingProvider}
              </CardTitle>
              <CardDescription>
                {connectingType === 'shipping' 
                  ? 'Provide API credentials to connect your shipping account'
                  : 'Connect your ad account to import campaign data'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="Enter API key"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-id">
                  {connectingType === 'shipping' ? 'Account ID' : 'Ad Account ID'}
                </Label>
                <Input 
                  id="account-id" 
                  value={accountId} 
                  onChange={(e) => setAccountId(e.target.value)} 
                  placeholder={connectingType === 'shipping' ? 'Enter account ID' : 'Enter ad account ID'}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-sync" 
                  checked={autoSync} 
                  onCheckedChange={setAutoSync} 
                />
                <Label htmlFor="auto-sync">Enable automatic data synchronization</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelConnect}>
                Cancel
              </Button>
              <Button onClick={handleSubmitCredentials}>
                Connect
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as IntegrationType)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="shipping" className="flex items-center justify-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Shipping</span>
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center justify-center gap-2">
                <Facebook className="h-4 w-4" />
                <span>Marketing</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipping" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shippingProviders.map(provider => (
                  <IntegrationCard
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                    logo={provider.logo}
                    type="shipping"
                    onConnect={handleConnect}
                  />
                ))}
                <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                  <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Add Custom Shipping Provider
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Configure
                  </Button>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adPlatforms.map(platform => (
                  <IntegrationCard
                    key={platform.id}
                    id={platform.id}
                    name={platform.name}
                    logo={platform.logo}
                    type="marketing"
                    onConnect={handleConnect}
                  />
                ))}
                <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                  <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Add Custom Marketing Platform
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Configure
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationTab;
