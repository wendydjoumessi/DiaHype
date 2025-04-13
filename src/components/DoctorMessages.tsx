
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

const messages = [
  {
    sender: "Dr. Williams",
    avatar: "/placeholder.svg",
    initials: "DW",
    time: "Yesterday",
    content: "Your latest A1C results look good. Keep up with the current medication schedule.",
  },
  {
    sender: "Dr. Martinez",
    avatar: "/placeholder.svg",
    initials: "DM",
    time: "3 days ago",
    content: "Please monitor your blood pressure daily for the next week and send me the readings.",
  }
];

export function DoctorMessages() {
  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className="p-3 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} alt={msg.sender} />
                <AvatarFallback className="bg-health-light text-health-primary text-xs">
                  {msg.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{msg.sender}</p>
                <p className="text-xs text-gray-500">{msg.time}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-7">
              Reply
            </Button>
          </div>
          <p className="text-sm">{msg.content}</p>
        </div>
      ))}
      
      <div className="flex items-center space-x-2 mt-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="w-full p-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-health-primary focus:border-health-primary"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-health-primary hover:text-health-accent transition-colors">
            <SendHorizontal size={18} />
          </button>
        </div>
        <Button size="sm" className="bg-health-primary hover:bg-health-accent">Send</Button>
      </div>
    </div>
  );
}
