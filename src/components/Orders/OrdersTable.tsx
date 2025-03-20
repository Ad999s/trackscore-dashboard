import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowDown, ArrowUp, CalendarIcon, Filter, Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Slider
} from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  product: string;
  paymentType: string;
  paymentValue: number;
  tierCity: string;
  qualityScore: number;
  deliveryTime: string;
  shipmentStatus: string;
  tags: string[];
  flagged: boolean;
  shippable: boolean;
}

interface OrdersTableProps {
  threshold: number;
  filters: {
    dateRange: { from: Date | undefined; to: Date | undefined };
    datePreset: string;
    onlyBelowThreshold: boolean;
    onlyAboveThreshold: boolean;
    orderStatus: string[];
    tierCity: string[];
    deliveryTime: string[];
    verificationStatus: string[];
    tags: string[];
    scoreRange: [number, number];
    searchQuery: string;
  };
  selectedOrders: string[];
  onSelectOrders: (orders: string[]) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ threshold, filters, selectedOrders, onSelectOrders }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<Order[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [datePreset, setDatePreset] = useState<string>("today");
  const [showFlagged, setShowFlagged] = useState(false);
  const [showShippable, setShowShippable] = useState(false);
  const [pageSize, setPageSize] = useState(100);

  useEffect(() => {
    const generateMockData = (count: number): Order[] => {
      const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
      const paymentTypes = ['COD', 'Prepaid', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];
      const tierCities = ['Tier 1', 'Tier 2', 'Tier 3'];
      const deliveryTimes = ['1-2 days', '3-5 days', '1 week', '2 weeks'];
      const productNames = ['Smartphone', 'Laptop', 'Headphones', 'Smart Watch', 'Tablet', 'Camera', 'Speaker'];
      const tagsOptions = ['Fast Order', 'First Order', 'Second Order', 'Repeat Order', 'Past Fraud'];
      
      return Array.from({ length: count }, (_, i) => {
        const orderValue = Math.floor(Math.random() * 2000) + 50;
        const qualityScore = Math.floor(Math.random() * 100);
        const numTags = Math.floor(Math.random() * 3);
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 60));
        const flagged = Math.random() > 0.7;
        const shippable = Math.random() > 0.3;
        
        const tags = Array.from({ length: numTags }, () => tagsOptions[Math.floor(Math.random() * tagsOptions.length)]);
        
        return {
          id: `order-${i}`,
          orderNumber: `#${Math.floor(Math.random() * 100000)}`,
          customerName: `Customer ${i}`,
          orderDate: orderDate.toISOString().split('T')[0],
          product: productNames[Math.floor(Math.random() * productNames.length)],
          paymentType: paymentTypes[Math.floor(Math.random() * paymentTypes.length)],
          paymentValue: orderValue,
          tierCity: tierCities[Math.floor(Math.random() * tierCities.length)],
          qualityScore: qualityScore,
          deliveryTime: deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)],
          shipmentStatus: statuses[Math.floor(Math.random() * statuses.length)],
          tags: [...new Set(tags)],
          flagged,
          shippable
        };
      });
    };
    
    const mockData = generateMockData(1000);
    setData(mockData);
  }, []);
  
  useEffect(() => {
    if (selectAll) {
      onSelectOrders(data.map(order => order.id));
    } else {
      onSelectOrders([]);
    }
  }, [selectAll, data, onSelectOrders]);

  // Handle date preset changes
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    
    switch (datePreset) {
      case 'today':
        setDateRange({ from: today, to: today });
        break;
      case 'yesterday':
        setDateRange({ from: yesterday, to: yesterday });
        break;
      case 'last7days':
        setDateRange({ from: lastWeekStart, to: today });
        break;
      case 'custom':
        // Keep the current custom range
        break;
      default:
        setDateRange({ from: undefined, to: undefined });
    }
  }, [datePreset]);
  
  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectAll(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            const orderId = row.original.id;
            if (value) {
              onSelectOrders([...selectedOrders, orderId]);
            } else {
              onSelectOrders(selectedOrders.filter(id => id !== orderId));
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Order ID
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Date
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "product",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Product
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "paymentType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Payment Type
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "paymentValue",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Payment Value
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("paymentValue") as string)
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "tierCity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Tier City
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "qualityScore",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Score
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const score = row.getValue("qualityScore") as number;
        let badgeColor = "bg-green-100 text-green-700";
        if (score < threshold) {
          badgeColor = "bg-red-100 text-red-700";
        }
        
        return (
          <Badge className={badgeColor}>
            {score}
          </Badge>
        );
      },
    },
    {
      accessorKey: "tags",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Tags
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "deliveryTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Delivery Time
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: "shipmentStatus",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Shipment Status
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4"/>
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4"/>
            ) : (
              <ArrowUp className="ml-2 h-4 w-4 opacity-30"/>
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.getValue("shipmentStatus") as string;
        let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
        
        switch(status) {
          case "Delivered":
            badgeVariant = "default";
            break;
          case "Shipped":
            badgeVariant = "secondary";
            break;
          case "Cancelled":
            badgeVariant = "destructive";
            break;
          default:
            badgeVariant = "outline";
        }
        
        return <Badge variant={badgeVariant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const order = row.original

        return (
          <div className="flex justify-end">
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-8 px-3 flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
          </div>
        )
      },
    },
  ]

  // Filter data based on flagged and shippable status
  const filteredData = React.useMemo(() => {
    let filtered = [...data];
    
    if (showFlagged) {
      filtered = filtered.filter(order => order.flagged);
    }
    
    if (showShippable) {
      filtered = filtered.filter(order => order.shippable);
    }
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        order => 
          order.orderNumber.toLowerCase().includes(lowercaseQuery) ||
          order.customerName.toLowerCase().includes(lowercaseQuery) ||
          order.product.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return filtered;
  }, [data, showFlagged, showShippable, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  })

  // Handle slider value change with the correct typing
  const handleScoreRangeChange = (values: number[]) => {
    // Ensure we're setting a tuple of exactly two numbers
    setScoreRange([values[0], values[1]] as [number, number]);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {datePreset !== 'custom' ? (
                      datePreset === 'today' ? 'Today' :
                      datePreset === 'yesterday' ? 'Yesterday' :
                      datePreset === 'last7days' ? 'Last 7 Days' : 'Date Range'
                    ) : (
                      dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Custom Range"
                      )
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col p-3 gap-3">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-medium">Date Presets</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={datePreset === 'today' ? 'default' : 'outline'}
                        onClick={() => setDatePreset('today')}
                      >
                        Today
                      </Button>
                      <Button
                        size="sm"
                        variant={datePreset === 'yesterday' ? 'default' : 'outline'}
                        onClick={() => setDatePreset('yesterday')}
                      >
                        Yesterday
                      </Button>
                      <Button
                        size="sm"
                        variant={datePreset === 'last7days' ? 'default' : 'outline'}
                        onClick={() => setDatePreset('last7days')}
                      >
                        Last 7 Days
                      </Button>
                      <Button
                        size="sm"
                        variant={datePreset === 'custom' ? 'default' : 'outline'}
                        onClick={() => setDatePreset('custom')}
                      >
                        Custom
                      </Button>
                    </div>
                  </div>
                  
                  {datePreset === 'custom' && (
                    <>
                      <Separator />
                      <div className="grid gap-2">
                        <h4 className="font-medium">Date From</h4>
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => 
                            setDateRange((prev) => ({ ...prev, from: date }))
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </div>
                      <Separator />
                      <div className="grid gap-2">
                        <h4 className="font-medium">Date To</h4>
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => 
                            setDateRange((prev) => ({ ...prev, to: date }))
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </div>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <Button
              variant={filterOpen ? "default" : "outline"}
              className="flex items-center gap-1"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
          
          <div className="ml-auto">
            <Button className="flex items-center gap-1">
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {filterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-md border animate-in fade-in">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Score Range</h3>
              <Slider 
                defaultValue={[0, 100]} 
                max={100} 
                step={1}
                value={scoreRange}
                onValueChange={handleScoreRangeChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{scoreRange[0]}</span>
                <span>{scoreRange[1]}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tier City</h3>
              <div className="flex flex-wrap gap-1">
                {['Tier 1', 'Tier 2', 'Tier 3'].map(tier => (
                  <Badge 
                    key={tier}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {tier}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Delivery Time</h3>
              <div className="flex flex-wrap gap-1">
                {['1-2 days', '3-5 days', '1 week', '2 weeks'].map(time => (
                  <Badge 
                    key={time}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {['Fast Order', 'First Order', 'Second Order', 'Repeat Order', 'Past Fraud'].map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Shipment Status</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Payment Method</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cod">COD</SelectItem>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                  <SelectItem value="creditcard">Credit Card</SelectItem>
                  <SelectItem value="debitcard">Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-full md:col-span-1">
              <h3 className="text-sm font-medium">Order Filters</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flagged-orders"
                    checked={showFlagged}
                    onCheckedChange={setShowFlagged}
                  />
                  <label htmlFor="flagged-orders" className="text-sm">Show Flagged Orders Only</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="shippable-orders"
                    checked={showShippable}
                    onCheckedChange={setShowShippable}
                  />
                  <label htmlFor="shippable-orders" className="text-sm">Show Shippable Orders Only</label>
                </div>
              </div>
            </div>
            
            <div className="flex items-end gap-2 col-span-full">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setScoreRange([0, 100]);
                  setDatePreset('today');
                  setDateRange({ from: undefined, to: undefined });
                  setShowFlagged(false);
                  setShowShippable(false);
                }}
              >
                Reset Filters
              </Button>
              <Button 
                size="sm"
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="rounded-md border overflow-hidden w-full shadow-sm">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {Math.min(pageSize, table.getFilteredRowModel().rows.length)} of {filteredData.length} order(s)
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Show:</span>
          <Button
            variant={pageSize === 100 ? "default" : "outline"}
            size="sm"
            onClick={() => setPageSize(100)}
          >
            100
          </Button>
          <Button
            variant={pageSize === 500 ? "default" : "outline"}
            size="sm"
            onClick={() => setPageSize(500)}
          >
            500
          </Button>
          <Button
            variant={pageSize === 1000 ? "default" : "outline"}
            size="sm"
            onClick={() => setPageSize(1000)}
          >
            1000
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrdersTable;
