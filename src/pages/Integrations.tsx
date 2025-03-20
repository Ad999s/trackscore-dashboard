
import React from 'react';
import { Link2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Integrations = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Integrations</h1>
          <p className="text-slate-500 mt-1">
            Connect your shipping providers and marketing platforms
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="shipping" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="shipping">Shipping Companies</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Platforms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shipping">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Delhivery</CardTitle>
                <CardDescription>Connect your Delhivery shipping account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delhivery-api-key">API Key</Label>
                    <Input id="delhivery-api-key" placeholder="Enter your Delhivery API key" />
                    <p className="text-xs text-slate-500">Find this in your Delhivery dashboard</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="delhivery-client-id">Client ID</Label>
                    <Input id="delhivery-client-id" placeholder="Enter your Delhivery client ID" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="delhivery-client-secret">Secret Key</Label>
                    <Input id="delhivery-client-secret" type="password" placeholder="Enter your secret key" />
                  </div>
                  
                  <Button className="w-full">Connect Delhivery</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>DTDC</CardTitle>
                <CardDescription>Connect your DTDC shipping account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dtdc-api-key">API Key</Label>
                    <Input id="dtdc-api-key" placeholder="Enter your DTDC API key" />
                    <p className="text-xs text-slate-500">Find this in your DTDC dashboard</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dtdc-customer-id">Customer ID</Label>
                    <Input id="dtdc-customer-id" placeholder="Enter your DTDC customer ID" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dtdc-access-token">Access Token</Label>
                    <Input id="dtdc-access-token" type="password" placeholder="Enter your access token" />
                  </div>
                  
                  <Button className="w-full">Connect DTDC</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="marketing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Ads</CardTitle>
                <CardDescription>Connect your Google Ads account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="google-client-id">Client ID</Label>
                    <Input id="google-client-id" placeholder="Enter your Google client ID" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="google-client-secret">Client Secret</Label>
                    <Input id="google-client-secret" type="password" placeholder="Enter your client secret" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="google-developer-token">Developer Token</Label>
                    <Input id="google-developer-token" placeholder="Enter your developer token" />
                  </div>
                  
                  <Button className="w-full">Connect Google Ads</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Facebook Ads</CardTitle>
                <CardDescription>Connect your Facebook Ads account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fb-app-id">App ID</Label>
                    <Input id="fb-app-id" placeholder="Enter your Facebook app ID" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fb-app-secret">App Secret</Label>
                    <Input id="fb-app-secret" type="password" placeholder="Enter your app secret" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fb-access-token">Access Token</Label>
                    <Input id="fb-access-token" type="password" placeholder="Enter your access token" />
                    <p className="text-xs text-slate-500">Generate this from Facebook Business Manager</p>
                  </div>
                  
                  <Button className="w-full">Connect Facebook Ads</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
