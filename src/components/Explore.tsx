import React, { useState } from 'react';
import { Search, TrendingUp, User, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"

const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchTerm}`);
    // Here you would typically fetch search results from your API
  };

  const trendingTopics = ['#summer', '#travel', '#food', '#fashion'];
  const suggestedProfiles = [
    { id: 1, name: 'John Doe', username: '@johndoe' },
    { id: 2, name: 'Jane Smith', username: '@janesmith' },
    { id: 3, name: 'Bob Johnson', username: '@bobjohnson' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Explore</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users, hashtags, or keywords"
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-secondary">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <span key={topic} className="bg-accent text-white px-3 py-1 rounded-full text-sm">
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-secondary">Suggested Profiles</h3>
        <div className="space-y-4">
          {suggestedProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
                  <Circle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.username}</p>
                </div>
              </div>
              <Button
                onClick={() => toast.success(`Followed ${profile.name}`)}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;