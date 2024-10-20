import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const FollowersList: React.FC = () => {
  const navigate = useNavigate();
  const followers = ['User1', 'User2', 'User3']; // This should be fetched from your actual data

  const handleCall = (follower: string) => {
    console.log(`Calling ${follower}`);
    // Implement actual call functionality here
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Followers List</h1>
      <ul>
        {followers.map((follower, index) => (
          <li key={index} className="mb-2">
            {follower} 
            <Button onClick={() => handleCall(follower)} className="ml-2">Call</Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
    </div>
  );
};

export default FollowersList;