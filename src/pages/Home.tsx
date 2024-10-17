import React from 'react';
import Feed from '../components/Feed';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Feed</h1>
      <Feed />
    </div>
  );
};

export default Home;