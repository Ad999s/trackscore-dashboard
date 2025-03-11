
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon, Plus, X, Save, BarChart2, LineChart as LineChartIcon, RefreshCw } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data with multiple metrics
const sampleData = [
  { name: 'Jan', revenue: 4000, orders: 240, deliveryTime: 3.2, returnRate: 2.5 },
  { name: 'Feb', revenue: 3000, orders: 198, deliveryTime: 4.1, returnRate: 3.0 },
  { name: 'Mar', revenue: 5000, orders: 280, deliveryTime: 3.5, returnRate: 2.8 },
  { name: 'Apr', revenue: 8000, orders: 308, deliveryTime: 2.9, returnRate: 1.9 },
  { name: 'May', revenue: 6000, orders: 250, deliveryTime: 3.8, returnRate: 2.2 },
  { name: 'Jun', revenue: 7000, orders: 300, deliveryTime: 3.0, returnRate: 2.0 },
  { name: 'Jul', revenue: 9000, orders: 380, deliveryTime: 2.7, returnRate: 1.8 },
  { name: 'Aug', revenue: 11000, orders: 450, deliveryTime: 2.5, returnRate: 1.5 },
  { name: 'Sep', revenue: 10000, orders: 420, deliveryTime: 2.8, returnRate: 1.6 },
  { name: 'Oct', revenue: 12000, orders: 490, deliveryTime: 2.6, returnRate: 1.7 },
  { name: 'Nov', revenue: 14000, orders: 520, deliveryTime: 2.4, returnRate: 1.4 },
  { name: 'Dec', revenue: 18000, orders: 600, deliveryTime: 2.2, returnRate: 1.2 },
];

// Define metric options and their properties
const metricOptions = [
  { id: 'revenue', name: 'Revenue', color: '#8884d8', unit: '₹', type: 'bar' },
  { id: 'orders', name: 'Order Volume', color: '#82ca9d', unit: '', type: 'bar' },
  { id: 'deliveryTime', name: 'Delivery Time', color: '#ffc658', unit: 'days', type: 'line' },
  { id: 'returnRate', name: 'Return Rate', color: '#ff8042', unit: '%', type: 'line' },
];

// Define default saved views
const defaultSavedViews = [
  { 
    id: 'view1', 
    name: 'Revenue & Orders', 
    metrics: ['revenue', 'orders'],
    chartType: 'composed'
  },
  { 
    id: 'view2', 
    name: 'Delivery Performance', 
    metrics: ['deliveryTime', 'returnRate'],
    chartType: 'line'
  },
];

const PerformanceOverview = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['revenue']);
  const [availableMetrics, setAvailableMetrics] = useState(metricOptions);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'composed'>('composed');
  const [isAddingMetric, setIsAddingMetric] = useState(false);
  const [savedViews, setSavedViews] = useState(defaultSavedViews);
  const [viewName, setViewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Scale factors for different metrics to make them fit well in the same chart
  const getScaleFactor = (metricId: string) => {
    switch(metricId) {
      case 'revenue': return 1;
      case 'orders': return 20;
      case 'deliveryTime': return 3000;
      case 'returnRate': return 5000;
      default: return 1;
    }
  };

  // Apply scaling to data for visualization
  const prepareChartData = () => {
    return sampleData.map(item => {
      const scaledItem = { ...item };
      selectedMetrics.forEach(metric => {
        if (metric !== 'revenue') {
          scaledItem[`${metric}Scaled`] = item[metric as keyof typeof item] as number * getScaleFactor(metric);
        }
      });
      return scaledItem;
    });
  };

  const chartData = prepareChartData();

  const handleMetricToggle = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(prev => prev.filter(id => id !== metricId));
    } else {
      setSelectedMetrics(prev => [...prev, metricId]);
    }
  };

  const saveCurrentView = () => {
    if (!viewName) return;
    
    const newView = {
      id: `view${savedViews.length + 1}`,
      name: viewName,
      metrics: selectedMetrics,
      chartType
    };
    
    setSavedViews(prev => [...prev, newView]);
    setIsSaving(false);
    setViewName('');
  };

  const loadSavedView = (view: typeof savedViews[0]) => {
    setSelectedMetrics(view.metrics);
    setChartType(view.chartType as 'bar' | 'line' | 'composed');
  };

  const removeMetric = (metricId: string) => {
    setSelectedMetrics(prev => prev.filter(id => id !== metricId));
  };

  // Get color for a specific metric
  const getMetricColor = (metricId: string) => {
    return metricOptions.find(option => option.id === metricId)?.color || '#000';
  };

  // Get unit for a specific metric
  const getMetricUnit = (metricId: string) => {
    return metricOptions.find(option => option.id === metricId)?.unit || '';
  };

  // Get name for a specific metric
  const getMetricName = (metricId: string) => {
    return metricOptions.find(option => option.id === metricId)?.name || metricId;
  };

  // Custom tooltip to show actual values (not scaled ones)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => {
            // Extract the original metric name from the dataKey (removing 'Scaled' suffix)
            const metricId = entry.dataKey.replace('Scaled', '');
            const isScaled = entry.dataKey.endsWith('Scaled');
            
            // Get the actual value (either directly or from the original data)
            const actualValue = isScaled 
              ? sampleData.find(item => item.name === label)?.[metricId as keyof typeof sampleData[0]]
              : entry.value;
              
            return (
              <p key={index} style={{ color: entry.color }}>
                {`${getMetricName(metricId)}: ${actualValue}${getMetricUnit(metricId)}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
        <div className="flex gap-2">
          <Tabs 
            value={chartType} 
            onValueChange={(value) => setChartType(value as 'bar' | 'line' | 'composed')}
            className="h-8"
          >
            <TabsList className="h-8">
              <TabsTrigger value="bar" className="h-8 px-2">
                <BarChart2 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="line" className="h-8 px-2">
                <LineChartIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="composed" className="h-8 px-2">
                Mixed
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Saved Views
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-2 border-b border-gray-100">
                <h4 className="font-medium">Saved Views</h4>
              </div>
              <div className="max-h-80 overflow-auto">
                {savedViews.map(view => (
                  <div 
                    key={view.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    onClick={() => loadSavedView(view)}
                  >
                    <div>
                      <div className="font-medium">{view.name}</div>
                      <div className="text-xs text-gray-500">
                        {view.metrics.map(m => getMetricName(m)).join(', ')}
                      </div>
                    </div>
                    {view.metrics.map(metric => (
                      <div 
                        key={metric} 
                        className="w-2 h-2 rounded-full ml-1" 
                        style={{ backgroundColor: getMetricColor(metric) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              {isSaving ? (
                <div className="p-2 border-t border-gray-100 gap-2 flex">
                  <input 
                    type="text"
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    placeholder="View name"
                    className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded"
                  />
                  <Button size="sm" className="h-8" onClick={saveCurrentView}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              ) : (
                <div className="p-2 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => setIsSaving(true)}
                  >
                    Save Current View
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedMetrics.map(metricId => (
            <Badge 
              key={metricId} 
              variant="outline" 
              className="flex items-center gap-1"
              style={{ borderColor: getMetricColor(metricId) }}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: getMetricColor(metricId) }}
              />
              {getMetricName(metricId)}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => removeMetric(metricId)}
              />
            </Badge>
          ))}
          
          {selectedMetrics.length < 4 && (
            <Popover open={isAddingMetric} onOpenChange={setIsAddingMetric}>
              <PopoverTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  Add Metric
                </Badge>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="start">
                <div className="p-1">
                  {metricOptions.map(option => (
                    <div 
                      key={option.id} 
                      className={`flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md ${
                        selectedMetrics.includes(option.id) ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => {
                        handleMetricToggle(option.id);
                        if (!selectedMetrics.includes(option.id)) {
                          setIsAddingMetric(false);
                        }
                      }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                          selectedMetrics.includes(option.id) 
                            ? 'bg-primary border-primary' 
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedMetrics.includes(option.id) && (
                          <CheckIcon className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex items-center flex-1">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: option.color }}
                        />
                        <span>{option.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedMetrics.map(metric => (
                  <Bar 
                    key={metric}
                    type="monotone"
                    dataKey={metric === 'revenue' ? metric : `${metric}Scaled`}
                    name={getMetricName(metric)}
                    fill={getMetricColor(metric)}
                  />
                ))}
              </BarChart>
            ) : chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedMetrics.map(metric => (
                  <Line 
                    key={metric}
                    type="monotone"
                    dataKey={metric === 'revenue' ? metric : `${metric}Scaled`}
                    name={getMetricName(metric)}
                    stroke={getMetricColor(metric)}
                  />
                ))}
              </LineChart>
            ) : (
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedMetrics.map(metric => {
                  const metricType = metricOptions.find(m => m.id === metric)?.type;
                  
                  if (metricType === 'line') {
                    return (
                      <Line 
                        key={metric}
                        type="monotone"
                        dataKey={metric === 'revenue' ? metric : `${metric}Scaled`}
                        name={getMetricName(metric)}
                        stroke={getMetricColor(metric)}
                      />
                    );
                  } else {
                    return (
                      <Bar 
                        key={metric}
                        dataKey={metric === 'revenue' ? metric : `${metric}Scaled`}
                        name={getMetricName(metric)}
                        fill={getMetricColor(metric)}
                      />
                    );
                  }
                })}
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
