import React from 'react';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our App</h1>
      <p className="text-xl text-gray-600 mb-8">A minimalist and sleek design with vibrant accents</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Feature 1</h2>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Feature 2</h2>
          <p className="text-gray-600 mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button className="inline-flex items-center text-pink-600 hover:text-pink-800">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Feature 3</h2>
          <p className="text-gray-600 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <button className="inline-flex items-center text-green-600 hover:text-green-800">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;