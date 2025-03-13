
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Clock, CheckCircle, AlertCircle, RotateCcw, CreditCard } from "lucide-react";
import { MessageList } from "@/components/Communication/MessageList";
import { MessageDetail } from "@/components/Communication/MessageDetail";

const Communication = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle conversation selection
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Communication Center</h1>
        <p className="text-muted-foreground">
          Manage all your customer conversations in one place. Tag, sort, and respond to customer inquiries efficiently.
        </p>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, message, or ID..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="refund">Refund Requests</SelectItem>
                <SelectItem value="return">Return Requests</SelectItem>
                <SelectItem value="question">Questions</SelectItem>
                <SelectItem value="complaint">Complaints</SelectItem>
                <SelectItem value="untagged">Untagged</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="last_replied">Last Replied</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TabsContent value="inbox" className="mt-0 lg:col-span-1">
            <MessageList 
              filterBy={filterBy}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onSelectConversation={handleSelectConversation}
              selectedId={selectedConversation}
            />
          </TabsContent>
          <TabsContent value="assigned" className="mt-0 lg:col-span-1">
            <MessageList 
              filterBy={filterBy}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onSelectConversation={handleSelectConversation}
              selectedId={selectedConversation}
              status="assigned"
            />
          </TabsContent>
          <TabsContent value="closed" className="mt-0 lg:col-span-1">
            <MessageList 
              filterBy={filterBy}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onSelectConversation={handleSelectConversation}
              selectedId={selectedConversation}
              status="closed"
            />
          </TabsContent>

          {selectedConversation ? (
            <div className="lg:col-span-2 border rounded-lg bg-white">
              <MessageDetail 
                conversationId={selectedConversation} 
                onClose={() => setSelectedConversation(null)}
              />
            </div>
          ) : (
            <div className="hidden lg:flex lg:col-span-2 border rounded-lg bg-white items-center justify-center p-12">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-trackscore-gray/20 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the list to view the details and respond to customer inquiries.
                </p>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default Communication;
