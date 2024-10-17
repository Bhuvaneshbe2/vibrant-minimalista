import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Logo</h2>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Twitter</a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Facebook</a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Instagram</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2023 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;