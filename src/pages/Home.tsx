import React from 'react';
import Feed from '../components/Feed';
import Messages from '../components/Messages';
import MediaUpload from '../components/MediaUpload';
import Explore from '../components/Explore';
import Notifications from '../components/Notifications';
import Updates from '../components/Updates';
import SearchPosting from '../components/SearchPosting';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 bg-gradient-to-br from-primary to-secondary min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-8 pt-8">Welcome to Your Feed</h1>
      <SearchPosting />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <Updates />
          <MediaUpload />
        </div>
        <div>
          <Feed />
        </div>
        <div>
          <div className="flex justify-around mb-8">
            <CircularIcon icon="message-circle" label="Messages" />
            <CircularIcon icon="bell" label="Notifications" />
            <CircularIcon icon="compass" label="Explore" />
          </div>
          <Messages />
          <Explore />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

const CircularIcon: React.FC<{ icon: string; label: string }> = ({ icon, label }) => {
  const Icon = require('lucide-react')[icon];
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-2">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Home;