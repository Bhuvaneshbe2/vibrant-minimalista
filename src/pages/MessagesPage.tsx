import React from 'react';
import { Button } from "@/components/ui/button"
import MessagesSidebar from '../components/MessagesSidebar';
import ChatWindow from '../components/ChatWindow';
import UserProfile from '../components/UserProfile';

const MessagesPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <MessagesSidebar />
      <ChatWindow />
      <UserProfile />
    </div>
  );
};

export default MessagesPage;