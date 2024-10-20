import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import Messages from '../components/Messages';

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [followers] = useState(['User1', 'User2', 'User3']); // This should be fetched from your actual data

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Followers</h2>
          <ul>
            {followers.map((follower, index) => (
              <li key={index} className="mb-2">
                {follower}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <Messages />
        </div>
      </div>
      <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
    </div>
  );
};

export default MessagesPage;