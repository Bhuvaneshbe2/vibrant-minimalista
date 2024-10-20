import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const Updates: React.FC = () => {
  const navigate = useNavigate();

  const handleViewMediaFiles = () => {
    navigate('/media-files');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Updates</h2>
      <p className="mb-4">Check out the latest updates from your network.</p>
      <Button onClick={handleViewMediaFiles}>View Media Files</Button>
    </div>
  );
};

export default Updates;