import React from 'react';
import { useNavigate } from 'react-router-dom';
import Feed from '../components/Feed';
import Messages from '../components/Messages';
import Explore from '../components/Explore';
import Notifications from '../components/Notifications';
import Updates from '../components/Updates';
import { MessageCircle, Bell, Compass, BookOpen, Film } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
    toast.success(`Navigated to ${route.slice(1)}`);
  };

  return (
    <div className="container mx-auto px-4 bg-gradient-to-br from-primary to-secondary min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-8 pt-8">Welcome to Your Feed</h1>
      <div className="flex justify-around mb-8">
        <CircularIcon icon={BookOpen} label="Updates" onClick={() => handleNavigation('/updates')} />
        <CircularIcon icon={Film} label="Story" onClick={() => handleNavigation('/stories')} />
        <CircularIcon icon={MessageCircle} label="Messages" onClick={() => handleNavigation('/messages')} />
        <CircularIcon icon={Bell} label="Notifications" onClick={() => handleNavigation('/notifications')} />
        <CircularIcon icon={Compass} label="Explore" onClick={() => handleNavigation('/explore')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <Updates />
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

const CircularIcon: React.FC<{ icon: React.ElementType; label: string; onClick: () => void }> = ({ icon: Icon, label, onClick }) => {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center p-2 hover:bg-accent rounded-full transition-colors"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-2">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-sm">{label}</span>
    </Button>
  );
};

export default Home;