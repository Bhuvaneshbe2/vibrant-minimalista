
import React, { useState, useRef } from 'react';
import { Camera, Image, Smile, Clock, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Story {
  id: string;
  content: string;
  type: 'photo' | 'video' | 'text';
  timestamp: Date;
}

interface MediaFile {
  file: File;
  preview: string;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedMedia({
            file,
            preview: reader.result as string
          });
        };
        reader.readAsDataURL(file);
        toast.success('Media selected successfully');
      } else {
        toast.error('Please select an image or video file');
      }
    }
  };

  const addStory = () => {
    if (selectedMedia) {
      const newStory: Story = {
        id: Date.now().toString(),
        content: selectedMedia.preview,
        type: selectedMedia.file.type.startsWith('image/') ? 'photo' : 'video',
        timestamp: new Date(),
      };

      setStories([...stories, newStory]);
      setSelectedMedia(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Story added! It will disappear after 24 hours.');
    }
  };

  const removeExpiredStories = () => {
    const now = new Date();
    const updatedStories = stories.filter(
      (story) => now.getTime() - story.timestamp.getTime() < 24 * 60 * 60 * 1000
    );
    setStories(updatedStories);
  };

  React.useEffect(() => {
    const interval = setInterval(removeExpiredStories, 60000);
    return () => clearInterval(interval);
  }, [stories]);

  const clearSelection = () => {
    setSelectedMedia(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {/* Add Story Button */}
        <div className="flex flex-col items-center space-y-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,video/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors"
          >
            <Plus className="h-6 w-6 text-gray-600" />
          </button>
          <span className="text-xs text-gray-600">Add Story</span>
        </div>

        {/* Stories List */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1">
            <div className="rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
              <div className="rounded-full border-2 border-white overflow-hidden w-16 h-16">
                {story.type === 'photo' ? (
                  <img 
                    src={story.content} 
                    alt="Story" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video 
                    src={story.content} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <span className="text-xs">
              {new Date(story.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* Media Preview and Post UI */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-4">
            {selectedMedia.file.type.startsWith('image/') ? (
              <img
                src={selectedMedia.preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <video
                src={selectedMedia.preview}
                controls
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="flex gap-2 mt-4">
              <Button
                variant="destructive"
                onClick={clearSelection}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={addStory}
                className="flex-1"
              >
                Post Story
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
