import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Image, Edit2, Lock, Unlock } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bio, setBio] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [sharedContent, setSharedContent] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(currentUser);
    setUser(userData);
    setBio(userData.bio || '');
    setIsPublic(userData.isPublic || false);
    setFollowers(userData.followers || 0);
    setSharedContent(userData.sharedContent || []);
  }, [navigate]);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePublicProfile = () => {
    updateUser({ isPublic: !isPublic });
    setIsPublic(!isPublic);
  };

  const updateUser = (updates: Partial<any>) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success('Profile updated successfully');
  };

  const handleSaveBio = () => {
    updateUser({ bio });
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="relative">
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <label htmlFor="profile-picture-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer">
            <Image size={16} />
          </label>
          <input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.email}</h1>
          <p className="text-gray-600">{followers} followers</p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          id="bio"
          rows={3}
          value={bio}
          onChange={handleBioChange}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
          placeholder="Tell us about yourself..."
        ></textarea>
        <button
          onClick={handleSaveBio}
          className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Save Bio
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={togglePublicProfile}
          className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          {isPublic ? <Unlock size={16} className="mr-2" /> : <Lock size={16} className="mr-2" />}
          {isPublic ? 'Make Profile Private' : 'Make Profile Public'}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Shared Content</h2>
        {sharedContent.length > 0 ? (
          <ul className="space-y-2">
            {sharedContent.map((content: string, index: number) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md">{content}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No shared content yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;