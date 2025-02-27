
import React, { useState, useRef } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';

interface MediaFile {
  file: File;
  preview: string;
}

const MediaUpload: React.FC = () => {
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

  const handleUpload = () => {
    if (selectedMedia) {
      // Here you would typically send the file to your server
      toast.success(`Uploaded ${selectedMedia.file.name}`);
      setSelectedMedia(null);
    }
  };

  const clearSelection = () => {
    setSelectedMedia(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*"
          className="hidden"
        />
        
        {selectedMedia ? (
          <div className="relative w-full">
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
          </div>
        ) : (
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2"
          >
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500">Click to select media</span>
          </Button>
        )}

        {selectedMedia && (
          <Button
            onClick={handleUpload}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
