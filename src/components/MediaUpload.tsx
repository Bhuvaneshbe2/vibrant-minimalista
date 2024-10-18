import React, { useState, useRef } from 'react';
import { Upload, Scissors, Image as ImageIcon, Send } from 'lucide-react';
import { toast } from 'sonner';

const MediaUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('none');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically send the file to your server
      toast.success(`Uploaded ${selectedFile.name} with filter: ${filter}`);
      setSelectedFile(null);
      setPreview(null);
      setFilter('none');
    }
  };

  const filters = ['none', 'grayscale', 'sepia', 'invert'];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Media</h2>
      <div className="mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Upload className="mr-2 h-5 w-5" />
          Select File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*"
          className="hidden"
        />
      </div>
      {preview && (
        <div className="mb-4">
          {selectedFile?.type.startsWith('image/') ? (
            <img
              src={preview}
              alt="Preview"
              className={`max-w-full h-auto ${filter !== 'none' ? `filter-${filter}` : ''}`}
            />
          ) : (
            <video src={preview} controls className="max-w-full h-auto" />
          )}
        </div>
      )}
      {selectedFile?.type.startsWith('video/') && (
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mb-4 flex items-center">
          <Scissors className="mr-2 h-5 w-5" />
          Trim Video
        </button>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Apply Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {filters.map((f) => (
            <option key={f} value={f}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className={`w-full bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center ${
          !selectedFile ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Send className="mr-2 h-5 w-5" />
        Upload
      </button>
    </div>
  );
};

export default MediaUpload;