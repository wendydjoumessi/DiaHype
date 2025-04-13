
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseData } from "@/services/supabaseData";
import { supabaseAuth } from "@/services/supabaseAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function Messages() {
  // Get current user
  const currentUser = supabaseAuth.getCurrentUser();
  const userId = currentUser?.id || 'user-123'; // Fallback for testing
  
  // Check if on mobile
  const isMobile = useIsMobile();
  
  // State for the active conversation and message input
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);
  const [newMessageText, setNewMessageText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showConversationList, setShowConversationList] = useState(true);

  // Set up query client for mutations
  const queryClient = useQueryClient();
  
  // Handle conversation selection on mobile
  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowConversationList(false);
    }
  };
  
  // Handle back button on mobile
  const handleBackToList = () => {
    setShowConversationList(true);
  };
  
  // Effect to handle responsive behavior
  useEffect(() => {
    if (!isMobile) {
      setShowConversationList(true);
    }
  }, [isMobile]);
  
  // Fetch data using react-query
  const { data: doctors = [], isLoading: isDoctorsLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: supabaseData.getDoctors,
  });

  const { data: conversations = [], isLoading: isConversationsLoading } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => supabaseData.getConversations(userId),
  });

  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messages', activeConversation?.id],
    queryFn: () => activeConversation ? supabaseData.getMessages(activeConversation.id) : Promise.resolve([]),
    enabled: !!activeConversation,
  });

  // Set up mutations for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => 
      supabaseData.sendMessage(
        activeConversation!.id, 
        userId, 
        activeConversation!.participantId, 
        content
      ),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['messages', activeConversation?.id] });
      queryClient.invalidateQueries({ queryKey: ['conversations', userId] });
      toast.success("Message sent successfully");
      setMessageText("");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  });

  // Create new conversation and send first message
  const createConversationMutation = useMutation({
    mutationFn: async () => {
      // 1. Find if conversation already exists
      const existingConversation = conversations.find(
        conv => conv.participantId === selectedDoctor
      );
      
      if (existingConversation) {
        // If conversation exists, just send message to it
        await supabaseData.sendMessage(
          existingConversation.id,
          userId,
          selectedDoctor,
          newMessageText
        );
        return existingConversation;
      } else {
        // If no conversation exists, create one and send message
        const doctor = doctors.find(doc => doc.id === selectedDoctor);
        if (!doctor) throw new Error("Selected doctor not found");
        
        const newConversation = await supabaseData.createConversation(
          userId,
          selectedDoctor,
          doctor.name,
          doctor.avatar || '/placeholder.svg'
        );
        
        await supabaseData.sendMessage(
          newConversation.id,
          userId,
          selectedDoctor,
          newMessageText
        );
        
        return newConversation;
      }
    },
    onSuccess: (conversation) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['conversations', userId] });
      toast.success("Message sent successfully");
      
      // Reset form and close dialog
      setNewMessageText("");
      setSelectedDoctor("");
      setIsNewMessageDialogOpen(false);
      
      // Set the active conversation to the one we just created/used
      setActiveConversation(conversation);
      
      // On mobile, show the conversation
      if (isMobile) {
        setShowConversationList(false);
      }
    },
    onError: (error) => {
      console.error("Error creating conversation:", error);
      toast.error("Failed to send message. Please try again.");
    }
  });

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conv => conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to send a message
  const sendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    sendMessageMutation.mutate(messageText);
  };

  // Function to send a new message
  const sendNewMessage = () => {
    if (!newMessageText.trim() || !selectedDoctor) return;
    createConversationMutation.mutate();
  };

  // Function to format the timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Auto-scroll to bottom of messages when new messages arrive
  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <AppLayout>
      <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row">
        {/* Sidebar - Conversations List */}
        {(!isMobile || showConversationList) && (
          <div className="w-full md:w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Messages</h2>
                <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">New Message</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Select Doctor</label>
                        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {isDoctorsLoading ? (
                              <SelectItem value="loading" disabled>Loading doctors...</SelectItem>
                            ) : doctors.length === 0 ? (
                              <SelectItem value="none" disabled>No doctors available</SelectItem>
                            ) : (
                              doctors.map(doctor => (
                                <SelectItem key={doctor.id} value={doctor.id}>
                                  {doctor.name} - {doctor.specialty}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea 
                          placeholder="Type your message here..."
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewMessageDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={sendNewMessage} 
                        disabled={!newMessageText.trim() || !selectedDoctor || createConversationMutation.isPending}
                      >
                        {createConversationMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Conversations List */}
            <div className="flex-1 overflow-auto">
              {isConversationsLoading ? (
                <div className="p-4 text-center text-muted-foreground">Loading conversations...</div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No conversations found</div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b hover:bg-slate-50 cursor-pointer ${
                      activeConversation?.id === conversation.id ? 'bg-slate-100' : ''
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.participantAvatar} />
                          <AvatarFallback>{conversation.participantName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{conversation.participantName}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        {/* Main Content - Messages */}
        {(!isMobile || !showConversationList) && (
          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isMobile && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleBackToList}
                        className="md:hidden"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    )}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activeConversation.participantAvatar} />
                      <AvatarFallback>
                        {activeConversation.participantName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeConversation.participantName}</h3>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages Container */}
                <div id="messages-container" className="flex-1 p-4 overflow-auto bg-slate-50 space-y-4">
                  {isMessagesLoading ? (
                    <div className="text-center text-muted-foreground">Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-muted-foreground">No messages yet</div>
                  ) : (
                    messages.map((message) => {
                      const isCurrentUser = message.senderId === userId;
                      
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] ${isCurrentUser ? 'bg-health-primary text-white' : 'bg-white'} rounded-lg p-3 shadow-sm`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'} text-right mt-1`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input 
                      placeholder="Type a message..." 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!messageText.trim() || sendMessageMutation.isPending}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <Card className="w-[80%] max-w-md">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-medium mb-2">Welcome to Messages</h3>
                    <p className="text-muted-foreground mb-6">
                      Select a conversation from the sidebar or start a new chat with one of your doctors.
                    </p>
                    <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="mx-auto">Start a New Conversation</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New Message</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Select Doctor</label>
                            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a doctor" />
                              </SelectTrigger>
                              <SelectContent>
                                {isDoctorsLoading ? (
                                  <SelectItem value="loading" disabled>Loading doctors...</SelectItem>
                                ) : doctors.length === 0 ? (
                                  <SelectItem value="none" disabled>No doctors available</SelectItem>
                                ) : (
                                  doctors.map(doctor => (
                                    <SelectItem key={doctor.id} value={doctor.id}>
                                      {doctor.name} - {doctor.specialty}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <Textarea 
                              placeholder="Type your message here..."
                              value={newMessageText}
                              onChange={(e) => setNewMessageText(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNewMessageDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={sendNewMessage}
                            disabled={!newMessageText.trim() || !selectedDoctor || createConversationMutation.isPending}
                          >
                            {createConversationMutation.isPending ? "Sending..." : "Send Message"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
