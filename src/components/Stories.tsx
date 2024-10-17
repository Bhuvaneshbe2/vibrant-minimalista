import React, { useState } from 'react';
import { Camera, Image, Smile, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Story {
  id: string;
  content: string;
  timestamp: Date;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  const addStory = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      content: 'New story content',
      timestamp: new Date(),
    };

    setStories([...stories, newStory]);
    toast.success('Story added! It will disappear after 24 hours.');
  };

  const removeExpiredStories = () => {
    const now = new Date();
    const updatedStories = stories.filter(
      (story) => now.getTime() - story.timestamp.getTime() < 24 * 60 * 60 * 1000
    );
    setStories(updatedStories);
  };

  // Check for expired stories every minute
  React.useEffect(() => {
    const interval = setInterval(removeExpiredStories, 60000);
    return () => clearInterval(interval);
  }, [stories]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Stories</h2>
        <button
          onClick={addStory}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Camera className="mr-2 h-5 w-5" />
          Add Story
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white p-4 rounded-lg shadow-md">
            <p>{story.content}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {story.timestamp.toLocaleString()}
              </span>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;