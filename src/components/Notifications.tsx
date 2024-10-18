import React, { useState, useEffect } from 'react';
import { Bell, MessageCircle, Heart, User } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'comment' | 'follow';
  content: string;
  timestamp: Date;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState({
    messages: true,
    likes: true,
    comments: true,
    followers: true,
  });

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['message', 'like', 'comment', 'follow'][Math.floor(Math.random() * 4)] as Notification['type'],
          content: 'You have a new notification!',
          timestamp: new Date(),
        };
        setNotifications((prev) => [newNotification, ...prev]);
        toast.info(`New ${newNotification.type} notification!`);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'follow':
        return <User className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Preferences</h3>
        <div className="space-y-2">
          {Object.entries(preferences).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handlePreferenceChange(key as keyof typeof preferences)}
                className="mr-2"
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
            {getIcon(notification.type)}
            <div className="ml-3">
              <p>{notification.content}</p>
              <p className="text-sm text-gray-500">{notification.timestamp.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;