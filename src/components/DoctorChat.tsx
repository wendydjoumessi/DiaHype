
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "doctor";
  text: string;
  timestamp: Date;
}

interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

interface DoctorChatProps {
  doctor: DoctorInfo;
  onClose: () => void;
}

export function DoctorChat({ doctor, onClose }: DoctorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      text: `Hello! I'm ${doctor.name}. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate doctor response after a short delay
    setTimeout(() => {
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        text: "Thank you for your message. I'd be happy to discuss this further. Would you like to schedule an appointment?",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
    }, 1500);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={doctor.avatar} alt={doctor.name} />
            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{doctor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs mt-1 opacity-70 block text-right">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: "2-digit", 
                  minute: "2-digit" 
                })}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t pt-3">
        <div className="flex w-full gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[50px] flex-1 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
