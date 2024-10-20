import React from 'react';
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const MessagesSidebar: React.FC = () => {
  const contacts = [
    { id: 1, name: 'Maqbul Sunto', lastMessage: 'Hey there!', time: '12:30 PM' },
    { id: 2, name: 'Tariq Ahmed', lastMessage: 'How are you?', time: '11:45 AM' },
    { id: 3, name: 'Abdullah Noman', lastMessage: 'See you soon!', time: '10:15 AM' },
    // Add more contacts as needed
  ];

  return (
    <div className="w-1/4 bg-white border-r border-gray-200">
      <div className="p-4">
        <Input type="text" placeholder="Search..." className="mb-4" />
        <ScrollArea className="h-[calc(100vh-120px)]">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
              <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">{contact.time}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default MessagesSidebar;