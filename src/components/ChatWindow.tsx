import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile } from 'lucide-react';

const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Implement send message functionality
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Abdullah Noman</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {/* Chat messages would go here */}
        <div className="bg-blue-100 p-3 rounded-lg mb-2 max-w-[70%]">
          <p>Hello! How are you?</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg mb-2 max-w-[70%] ml-auto">
          <p>I'm doing great, thanks for asking!</p>
        </div>
      </ScrollArea>
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 mx-2"
          />
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;