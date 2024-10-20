import React from 'react';
import { Button } from "@/components/ui/button"
import { Facebook, Twitter } from 'lucide-react';

const UserProfile: React.FC = () => {
  return (
    <div className="w-1/4 bg-white border-l border-gray-200 p-4">
      <div className="text-center mb-4">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-2"></div>
        <h2 className="text-xl font-semibold">Abdullah Noman</h2>
        <p className="text-gray-500">UX/UI Designer</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          This is a UI/UX designer with 5 years of experience in creating user-friendly interfaces.
        </p>
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        <Button variant="outline" size="icon">
          <Facebook className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Twitter className="h-5 w-5" />
        </Button>
      </div>
      <Button className="w-full">Suggest Chat</Button>
    </div>
  );
};

export default UserProfile;