import React from 'react';
import { Check, AlertCircle, Clock, CreditCard, RotateCcw, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for demonstration
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    customer: "John Smith",
    lastMessage: "I ordered the wrong size and need to return it.",
    date: "2023-10-15T14:30:00",
    unread: true,
    tags: ["return"],
    status: "new"
  },
  {
    id: "2",
    customer: "Alice Johnson",
    lastMessage: "When will I receive my refund? It's been a week since the return was processed.",
    date: "2023-10-14T10:15:00",
    unread: false,
    tags: ["refund"],
    status: "new"
  },
  {
    id: "3",
    customer: "Robert Davis",
    lastMessage: "The product I received is damaged. Can I get a replacement?",
    date: "2023-10-13T16:45:00",
    unread: true,
    tags: ["complaint"],
    status: "new"
  },
  {
    id: "4",
    customer: "Emily Wilson",
    lastMessage: "Do you offer international shipping?",
    date: "2023-10-12T09:20:00",
    unread: false,
    tags: ["question"],
    status: "assigned"
  },
  {
    id: "5",
    customer: "Michael Brown",
    lastMessage: "I'm having trouble applying the discount code at checkout.",
    date: "2023-10-11T13:10:00",
    unread: true,
    tags: ["question"],
    status: "closed"
  }
];

interface MessageListProps {
  filterBy: string;
  sortBy: string;
  searchQuery: string;
  status?: string;
  onSelectConversation: (id: string) => void;
  selectedId: string | null;
}

export const MessageList: React.FC<MessageListProps> = ({
  filterBy,
  sortBy,
  searchQuery,
  status = "new",
  onSelectConversation,
  selectedId
}) => {
  // Filter and sort the conversations based on props
  const filteredConversations = MOCK_CONVERSATIONS
    .filter(convo => {
      // Filter by status
      if (status && convo.status !== status && status !== "all") {
        return false;
      }
      
      // Filter by tag
      if (filterBy !== "all" && !convo.tags.includes(filterBy) && filterBy !== "untagged") {
        return false;
      }
      
      if (filterBy === "untagged" && convo.tags.length > 0) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          convo.customer.toLowerCase().includes(query) ||
          convo.lastMessage.toLowerCase().includes(query) ||
          convo.id.includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "priority") {
        // Sort by unread first, then by date
        if (a.unread !== b.unread) {
          return a.unread ? -1 : 1;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      // For "last_replied" or any other case, default to newest
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // Get tag icon
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "refund":
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case "return":
        return <RotateCcw className="w-4 h-4 text-amber-500" />;
      case "complaint":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "question":
        return <HelpCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today, return time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If within the past week, return day name
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise, return date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="border rounded-lg bg-white overflow-hidden h-[600px] flex flex-col">
      <div className="p-4 border-b font-medium flex justify-between items-center">
        <span>{status === "new" ? "New Messages" : status === "assigned" ? "Assigned to You" : "Closed Conversations"}</span>
        <span className="text-sm text-muted-foreground">{filteredConversations.length} conversations</span>
      </div>
      
      {filteredConversations.length > 0 ? (
        <div className="flex-grow overflow-y-auto">
          {filteredConversations.map((convo) => (
            <div 
              key={convo.id}
              className={cn(
                "border-b p-4 cursor-pointer hover:bg-trackscore-gray/10 transition-colors",
                selectedId === convo.id && "bg-trackscore-gray/20",
                convo.unread && "border-l-4 border-l-trackscore-blue pl-3"
              )}
              onClick={() => onSelectConversation(convo.id)}
            >
              <div className="flex justify-between mb-1">
                <h4 className={cn("font-medium", convo.unread && "font-semibold")}>{convo.customer}</h4>
                <span className="text-xs text-muted-foreground">{formatDate(convo.date)}</span>
              </div>
              <p className={cn(
                "text-sm text-muted-foreground line-clamp-2 mb-2", 
                convo.unread && "text-trackscore-text"
              )}>
                {convo.lastMessage}
              </p>
              <div className="flex gap-2">
                {convo.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-trackscore-gray/20"
                  >
                    {getTagIcon(tag)}
                    <span className="ml-1 capitalize">{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-trackscore-gray/20 flex items-center justify-center mb-3">
              <Check className="w-5 h-5 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-1">No conversations found</h4>
            <p className="text-sm text-muted-foreground">Try changing your filters or search query.</p>
          </div>
        </div>
      )}
    </div>
  );
};
