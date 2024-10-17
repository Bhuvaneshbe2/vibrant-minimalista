import React from 'react';
import Feed from '../components/Feed';
import Messages from '../components/Messages';
import Stories from '../components/Stories';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Feed</h1>
      <Stories />
      <Messages />
      <Feed />
    </div>
  );
};

export default Home;