import React, { useState } from 'react';
import { MessageCircle, Smile, Image, Mic, Video, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: string;
  content: string;
  type: 'text' | 'emoji' | 'gif' | 'voice' | 'video';
  timestamp: Date;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = (type: Message['type']) => {
    if (inputMessage.trim() === '' && type === 'text') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: type === 'text' ? inputMessage : `[${type} message]`,
      type,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} message sent!`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <div className="h-96 overflow-y-auto p-4 border-b">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="font-semibold">{message.sender}</p>
            <p>{message.content}</p>
            <p className="text-xs text-gray-500">{message.timestamp.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow mr-2 px-3 py-2 border rounded-md"
          placeholder="Type a message..."
        />
        <button onClick={() => sendMessage('emoji')} className="mr-2">
          <Smile className="h-6 w-6 text-gray-500" />
        </button>
        <button onClick={() => sendMessage('gif')} className="mr-2">
          <Image className="h-6 w-6 text-gray-500" />
        </button>
        <button onClick={() => sendMessage('voice')} className="mr-2">
          <Mic className="h-6 w-6 text-gray-500" />
        </button>
        <button onClick={() => sendMessage('video')} className="mr-2">
          <Video className="h-6 w-6 text-gray-500" />
        </button>
        <button onClick={() => sendMessage('text')} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Messages;