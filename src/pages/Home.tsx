
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Search, PlusCircle, Heart, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import Feed from '../components/Feed';
import MediaUpload from '../components/MediaUpload';
import Stories from '../components/Stories';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
    toast.success(`Navigated to ${route.slice(1)}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white min-h-screen">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold italic">Logo</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Stories */}
      <div className="p-4 border-b">
        <Stories />
      </div>

      {/* Media Upload */}
      <div className="p-4">
        <MediaUpload />
      </div>

      {/* Feed */}
      <div className="pb-16">
        <Feed />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-3 max-w-xl mx-auto">
        <Button variant="ghost" size="icon" onClick={() => handleNavigation('/')}>
          <HomeIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleNavigation('/explore')}>
          <Search className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleNavigation('/post')}>
          <PlusCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleNavigation('/profile')}>
          <User className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
