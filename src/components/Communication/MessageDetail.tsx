
import React, { useState } from 'react';
import { ArrowLeft, Send, Tag, Clock, User, Plus, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

// Sample data for demonstration
const MOCK_CONVERSATION_DETAILS = {
  "1": {
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: null,
      orderCount: 5,
      joinedDate: "2023-01-10T00:00:00",
    },
    tags: ["return"],
    status: "new",
    messages: [
      {
        id: "m1",
        from: "customer",
        content: "Hello, I ordered a medium shirt but I need to return it because I ordered the wrong size.",
        timestamp: "2023-10-15T14:30:00",
        read: false
      },
      {
        id: "m2",
        from: "customer",
        content: "Can you help me with the return process?",
        timestamp: "2023-10-15T14:31:00",
        read: false
      }
    ]
  },
  "2": {
    customer: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: null,
      orderCount: 2,
      joinedDate: "2023-05-22T00:00:00",
    },
    tags: ["refund"],
    status: "new",
    messages: [
      {
        id: "m1",
        from: "customer",
        content: "I returned my order last week but haven't received my refund yet.",
        timestamp: "2023-10-14T10:15:00",
        read: true
      },
      {
        id: "m2",
        from: "agent",
        content: "Thank you for reaching out! I'll check the status of your return and refund right away. Could you please provide your order number?",
        timestamp: "2023-10-14T10:45:00",
        read: true
      },
      {
        id: "m3",
        from: "customer",
        content: "My order number is #ORD-12345. Thank you for your help!",
        timestamp: "2023-10-14T11:05:00",
        read: true
      }
    ]
  }
};

// Available tags for the dropdown
const AVAILABLE_TAGS = [
  { value: "refund", label: "Refund Request" },
  { value: "return", label: "Return Request" },
  { value: "question", label: "Question" },
  { value: "complaint", label: "Complaint" },
  { value: "feedback", label: "Feedback" },
  { value: "shipping", label: "Shipping Issue" },
  { value: "payment", label: "Payment Issue" },
  { value: "product", label: "Product Inquiry" }
];

interface MessageDetailProps {
  conversationId: string;
  onClose: () => void;
}

export const MessageDetail: React.FC<MessageDetailProps> = ({
  conversationId,
  onClose
}) => {
  const conversation = MOCK_CONVERSATION_DETAILS[conversationId as keyof typeof MOCK_CONVERSATION_DETAILS];
  const [replyText, setReplyText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(conversation?.tags || []);
  const [newTag, setNewTag] = useState("");
  
  if (!conversation) {
    return (
      <div className="p-6 text-center">
        <p>Conversation not found</p>
        <Button onClick={onClose} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to list
        </Button>
      </div>
    );
  }

  // Handler for adding a tag
  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag) && tag) {
      setSelectedTags([...selectedTags, tag]);
    }
    setNewTag("");
  };

  // Handler for removing a tag
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // Handler for sending a reply
  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would add the message to the conversation
      // and send it to the backend
      alert(`Reply sent: ${replyText}`);
      setReplyText("");
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
           ' • ' + 
           date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <button 
            onClick={onClose}
            className="md:hidden mr-2 p-1 rounded-full hover:bg-trackscore-gray/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-medium">{conversation.customer.name}</h3>
            <p className="text-sm text-muted-foreground">{conversation.customer.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-1" /> Resolve
          </Button>
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-1" /> Assign
          </Button>
        </div>
      </div>

      {/* Main content: split into conversation and customer info */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Conversation area */}
        <div className="flex-grow flex flex-col overflow-hidden">
          {/* Messages list */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {conversation.messages.map(message => (
              <div 
                key={message.id}
                className={cn(
                  "flex",
                  message.from === "agent" ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.from === "agent" 
                      ? "bg-trackscore-blue text-white" 
                      : "bg-trackscore-gray/20 text-trackscore-text"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div 
                    className={cn(
                      "text-xs mt-1",
                      message.from === "agent" 
                        ? "text-blue-100" 
                        : "text-muted-foreground"
                    )}
                  >
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply area */}
          <div className="p-4 border-t">
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply();
                  }
                }}
              />
              <Button 
                onClick={handleSendReply}
                disabled={!replyText.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Customer info sidebar */}
        <div className="md:w-64 md:min-w-64 border-t md:border-t-0 md:border-l bg-trackscore-gray/5">
          <div className="p-4 border-b">
            <h4 className="font-medium mb-4">Customer Info</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm">{conversation.customer.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm break-all">{conversation.customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Customer Since</p>
                <p className="text-sm">
                  {new Date(conversation.customer.joinedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Order Count</p>
                <p className="text-sm">{conversation.customer.orderCount}</p>
              </div>
            </div>
          </div>

          {/* Tags section */}
          <div className="p-4">
            <h4 className="font-medium mb-3">Tags</h4>
            
            <div className="space-y-2 mb-4">
              {selectedTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-trackscore-gray/20"
                    >
                      <span className="capitalize">{tag}</span>
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No tags added yet</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Select 
                value={newTag} 
                onValueChange={(value) => {
                  setNewTag(value);
                  handleAddTag(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add tag" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_TAGS.filter(tag => !selectedTags.includes(tag.value)).map(tag => (
                    <SelectItem key={tag.value} value={tag.value}>
                      {tag.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
