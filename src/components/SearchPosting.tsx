import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

const SearchPosting: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Searching for: ${searchTerm}`);
    // Implement actual search functionality here
  };

  const handlePost = () => {
    toast.success('Opening post creation...');
    // Implement post creation functionality here
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
        <Button onClick={handlePost} variant="outline">Post</Button>
      </form>
    </div>
  );
};

export default SearchPosting;