import React, { useState } from 'react';
import { Camera, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Story {
  id: string;
  username: string;
  avatarUrl: string;
  viewed: boolean;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([
    { id: '1', username: 'Your Story', avatarUrl: '', viewed: false },
    { id: '2', username: 'john_doe', avatarUrl: 'https://picsum.photos/seed/1/200', viewed: false },
    { id: '3', username: 'jane_smith', avatarUrl: 'https://picsum.photos/seed/2/200', viewed: false },
    { id: '4', username: 'mike_wilson', avatarUrl: 'https://picsum.photos/seed/3/200', viewed: true },
    { id: '5', username: 'sara_jones', avatarUrl: 'https://picsum.photos/seed/4/200', viewed: true },
  ]);

  const addStory = () => {
    toast.success('Story added! It will disappear after 24 hours.');
  };

  return (
    <div className="px-4">
      <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
        {/* Add Story Button */}
        <div className="flex flex-col items-center space-y-1">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-gray-200">
              <AvatarImage src="https://picsum.photos/seed/user/200" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-xs">Your Story</span>
        </div>

        {/* Story Circles */}
        {stories.slice(1).map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1">
            <Avatar className={`w-16 h-16 border-2 ${story.viewed ? 'border-gray-200' : 'border-gradient-to-r from-pink-500 via-red-500 to-yellow-500'}`}>
              <AvatarImage src={story.avatarUrl} />
              <AvatarFallback>{story.username[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;