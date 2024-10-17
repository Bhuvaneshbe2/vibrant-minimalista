import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('currentUser');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">Logo</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link to="/about" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                  <Link to="/contact" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                  <Link to="/profile" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    <User className="inline-block mr-1" size={16} />
                    Profile
                  </Link>
                  <Link to="/" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    <MessageCircle className="inline-block mr-1" size={16} />
                    Messages
                  </Link>
                  <button onClick={handleLogout} className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/signup" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                <Link to="/about" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">About</Link>
                <Link to="/contact" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
                <Link to="/profile" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                  <User className="inline-block mr-1" size={16} />
                  Profile
                </Link>
                <Link to="/" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                  <MessageCircle className="inline-block mr-1" size={16} />
                  Messages
                </Link>
                <button onClick={handleLogout} className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/signup" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;