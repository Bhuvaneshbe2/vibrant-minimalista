import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import Stories from '../components/Stories';

const StoriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stories</h1>
      <Stories />
      <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
    </div>
  );
};

export default StoriesPage;