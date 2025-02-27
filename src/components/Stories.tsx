
import React, { useState, useRef } from 'react';
import { Camera, Image, Smile, Clock, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"

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

  // Check for expired stories every minute
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
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Stories</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*"
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Camera className="mr-2 h-5 w-5" />
          Add Story
        </Button>
      </div>

      {selectedMedia && (
        <div className="mb-4 relative">
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
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearSelection}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            onClick={addStory}
            className="mt-2 w-full"
          >
            Post Story
          </Button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white p-4 rounded-lg shadow-md">
            {story.type === 'photo' ? (
              <img src={story.content} alt="Story" className="w-full h-32 object-cover rounded-md" />
            ) : (
              <video src={story.content} className="w-full h-32 object-cover rounded-md" controls />
            )}
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
