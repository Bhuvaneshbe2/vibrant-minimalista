import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import Notifications from '../components/Notifications';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <Notifications />
      <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
    </div>
  );
};

export default NotificationsPage;