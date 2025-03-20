
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
import { ArrowDown, ArrowUp, CalendarIcon, Eye, Filter, MoreHorizontal, Pencil, Search, X } from 'lucide-react';
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
        };
      });
    };
    
    const mockData = generateMockData(100);
    setData(mockData);
  }, []);
  
  useEffect(() => {
    if (selectAll) {
      onSelectOrders(data.map(order => order.id));
    } else {
      onSelectOrders([]);
    }
  }, [selectAll, data, onSelectOrders]);
  
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
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
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
    },
  })

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
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Date Range"
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col p-2 gap-2">
                  <div className="grid gap-2">
                    <h4 className="font-medium">Date From</h4>
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => 
                        setDateRange((prev) => ({ ...prev, from: date }))
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
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
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </div>
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
                onValueChange={setScoreRange}
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
            
            <div className="flex items-end gap-2 col-span-full">
              <Button variant="outline" size="sm">Reset Filters</Button>
              <Button size="sm">Apply Filters</Button>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of {data.length} order(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrdersTable;
