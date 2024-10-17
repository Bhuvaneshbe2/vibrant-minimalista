import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Filter } from 'lucide-react';
import { toast } from 'sonner';

type PostType = 'video' | 'photo' | 'story';

interface Post {
  id: string;
  type: PostType;
  content: string;
  likes: number;
  comments: number;
  author: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<PostType | 'all'>('all');

  useEffect(() => {
    // Simulating fetching posts from an API
    const fetchPosts = () => {
      const mockPosts: Post[] = [
        { id: '1', type: 'photo', content: 'https://picsum.photos/seed/1/400/300', likes: 15, comments: 3, author: 'User1' },
        { id: '2', type: 'video', content: 'https://www.example.com/video1.mp4', likes: 25, comments: 7, author: 'User2' },
        { id: '3', type: 'story', content: 'This is a story post content', likes: 10, comments: 2, author: 'User3' },
        { id: '4', type: 'photo', content: 'https://picsum.photos/seed/2/400/300', likes: 30, comments: 5, author: 'User4' },
      ];
      setPosts(mockPosts);
    };

    fetchPosts();
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    toast.success('Post liked!');
  };

  const handleComment = (postId: string) => {
    toast.info('Comment feature coming soon!');
  };

  const handleShare = (postId: string) => {
    toast.info('Share feature coming soon!');
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.type === filter);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-4 flex justify-end">
        <select 
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value as PostType | 'all')}
        >
          <option value="all">All Posts</option>
          <option value="video">Videos</option>
          <option value="photo">Photos</option>
          <option value="story">Stories</option>
        </select>
      </div>
      {filteredPosts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="mb-2 font-semibold">{post.author}</div>
          {post.type === 'photo' && (
            <img src={post.content} alt="Post content" className="w-full rounded-md mb-4" />
          )}
          {post.type === 'video' && (
            <video src={post.content} controls className="w-full rounded-md mb-4" />
          )}
          {post.type === 'story' && (
            <p className="mb-4">{post.content}</p>
          )}
          <div className="flex justify-between items-center">
            <button onClick={() => handleLike(post.id)} className="flex items-center text-gray-600 hover:text-red-500">
              <Heart size={20} className="mr-1" /> {post.likes}
            </button>
            <button onClick={() => handleComment(post.id)} className="flex items-center text-gray-600 hover:text-blue-500">
              <MessageCircle size={20} className="mr-1" /> {post.comments}
            </button>
            <button onClick={() => handleShare(post.id)} className="flex items-center text-gray-600 hover:text-green-500">
              <Share2 size={20} className="mr-1" /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;