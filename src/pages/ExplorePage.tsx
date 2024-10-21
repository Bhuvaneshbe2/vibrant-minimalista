import React from 'react';
import Explore from '../components/Explore';

const ExplorePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <Explore />
    </div>
  );
};

export default ExplorePage;