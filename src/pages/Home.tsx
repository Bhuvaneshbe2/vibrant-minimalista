import React from 'react';
import { useNavigate } from 'react-router-dom';
import Feed from '../components/Feed';
import Stories from '../components/Stories';
import { MessageCircle, Bell, Compass, BookOpen, Film, Home as HomeIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
    toast.success(`Navigated to ${route.slice(1)}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white min-h-screen">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-pink-500">Instagram</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => handleNavigation('/notifications')}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNavigation('/messages')}>
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Stories Section */}
      <div className="border-b pb-4">
        <Stories />
      </div>

      {/* Main Feed */}
      <div className="pb-16">
        <Feed />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-6">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => handleNavigation('/')}>
            <HomeIcon className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNavigation('/explore')}>
            <Compass className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-pink-500 text-white hover:bg-pink-600">
            <Film className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNavigation('/updates')}>
            <BookOpen className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNavigation('/profile')}>
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;