import React from 'react';
import Updates from '../components/Updates';

const UpdatesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Updates</h1>
      <Updates />
    </div>
  );
};

export default UpdatesPage;