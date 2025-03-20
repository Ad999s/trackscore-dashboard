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
import { ArrowDown, ArrowUp, ChevronsDown, ChevronsUp, GripVertical, MoreHorizontal } from 'lucide-react';
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

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  city: string;
  country: string;
  orderValue: number;
  qualityScore: number;
  orderStatus: string;
  verificationStatus: string;
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
    verificationStatus: string[];
    tags: string[];
  };
  selectedOrders: string[];
  onSelectOrders: (orders: string[]) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ threshold, filters, selectedOrders, onSelectOrders }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<Order[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const generateMockData = (count: number): Order[] => {
      const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
      const verificationStatuses = ['Verified', 'Unverified', 'Pending'];
      const tagsOptions = ['High Value', 'VIP', 'New Customer', 'Problematic'];
      
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
          city: `City ${i}`,
          country: 'USA',
          orderValue: orderValue,
          qualityScore: qualityScore,
          orderStatus: statuses[Math.floor(Math.random() * statuses.length)],
          verificationStatus: verificationStatuses[Math.floor(Math.random() * verificationStatuses.length)],
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
          >
            Order Number
            <ArrowUp className="ml-2 h-4 w-4"/>
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
          >
            Customer Name
            <ArrowUp className="ml-2 h-4 w-4"/>
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
          >
            Order Date
            <ArrowUp className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
    },
    {
      accessorKey: "city",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            City
            <ArrowUp className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
    },
    {
      accessorKey: "country",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <ArrowUp className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
    },
    {
      accessorKey: "orderValue",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Value
            <ArrowUp className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("orderValue") as string)
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "qualityScore",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quality Score
            <ArrowUp className="ml-2 h-4 w-4"/>
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
      accessorKey: "orderStatus",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Status
            <ArrowUp className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
    },
    {
      accessorKey: "verificationStatus",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Verification Status
            <ArrowUp className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
    },
    {
      accessorKey: "tags",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tags
            <ArrowUp className="ml-2 h-4 w-4"/>
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
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const order = row.original

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Order</DropdownMenuItem>
                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete Order</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter order numbers..."
          value={(table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("orderNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter customer names..."
          value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("customerName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of {data.length} row(s) selected
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
