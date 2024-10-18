import React from 'react';
import Feed from '../components/Feed';
import Messages from '../components/Messages';
import Stories from '../components/Stories';
import MediaUpload from '../components/MediaUpload';
import Explore from '../components/Explore';
import Notifications from '../components/Notifications';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <Stories />
          <MediaUpload />
        </div>
        <div>
          <Feed />
        </div>
        <div>
          <Messages />
          <Explore />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Home;