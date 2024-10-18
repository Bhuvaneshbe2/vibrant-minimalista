import React, { useState } from 'react';
import { Search, TrendingUp, User } from 'lucide-react';
import { toast } from 'sonner';

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
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Explore</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users, hashtags, or keywords"
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <span key={topic} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Suggested Profiles</h3>
        <div className="space-y-4">
          {suggestedProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-10 w-10 text-gray-400 mr-3" />
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.username}</p>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Followed ${profile.name}`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;