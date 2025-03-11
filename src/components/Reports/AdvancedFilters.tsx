
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface AdvancedFiltersProps {
  onClose: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-2">Filter Reports</h3>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">City</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Product</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="product1">Product 1</SelectItem>
              <SelectItem value="product2">Product 2</SelectItem>
              <SelectItem value="product3">Product 3</SelectItem>
              <SelectItem value="product4">Product 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Payment Method</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="cod">Cash on Delivery</SelectItem>
              <SelectItem value="prepaid">Prepaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Customer Type</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
              <SelectItem value="returning">Returning Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Courier Partner</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select courier partner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Partners</SelectItem>
              <SelectItem value="partner1">Partner 1</SelectItem>
              <SelectItem value="partner2">Partner 2</SelectItem>
              <SelectItem value="partner3">Partner 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button variant="outline" size="sm">Reset All</Button>
        <Button size="sm" onClick={onClose}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
