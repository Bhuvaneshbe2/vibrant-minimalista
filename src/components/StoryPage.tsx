import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const StoryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add to Story</h1>
      <p>This is where you can add content to your story.</p>
      <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
    </div>
  );
};

export default StoryPage;