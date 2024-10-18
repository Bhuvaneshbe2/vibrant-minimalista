import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Filter, Upload, Plus, UserPlus, Mic, Phone } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Post } from '../types/post';
import * as postActions from '../utils/postActions';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Post['type'] | 'all'>('all');
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);

  useEffect(() => {
    // Simulating fetching posts from an API
    const fetchPosts = () => {
      const mockPosts: Post[] = [
        { id: '1', type: 'photo', content: 'https://picsum.photos/seed/1/400/300', likes: 15, comments: 3, author: 'User1', followers: 100 },
        { id: '2', type: 'video', content: 'https://www.example.com/video1.mp4', likes: 25, comments: 7, author: 'User2', followers: 200 },
        { id: '3', type: 'story', content: 'This is a story post content', likes: 10, comments: 2, author: 'User3', followers: 150 },
        { id: '4', type: 'photo', content: 'https://picsum.photos/seed/2/400/300', likes: 30, comments: 5, author: 'User4', followers: 300 },
      ];
      setPosts(mockPosts);
    };

    fetchPosts();
  }, []);

  const handleComment = (postId: string) => {
    setShowCommentInput(postId);
  };

  const submitComment = (postId: string) => {
    if (comment.trim()) {
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      ));
      toast.success('Comment added successfully!');
      setComment('');
      setShowCommentInput(null);
    }
  };

  const handleUploadMedia = () => {
    toast.info('Media upload feature coming soon!');
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.type === filter);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-4 flex justify-between items-center">
        <select 
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Post['type'] | 'all')}
        >
          <option value="all">All Posts</option>
          <option value="video">Videos</option>
          <option value="photo">Photos</option>
          <option value="story">Stories</option>
        </select>
        <Button onClick={handleUploadMedia} className="flex items-center">
          <Upload size={20} className="mr-2" /> Upload Media
        </Button>
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
            <Button variant="ghost" onClick={() => postActions.handleLike(posts, post.id, setPosts)} className="flex items-center text-gray-600 hover:text-red-500">
              <Heart size={20} className="mr-1" /> {post.likes}
            </Button>
            <Button variant="ghost" onClick={() => handleComment(post.id)} className="flex items-center text-gray-600 hover:text-blue-500">
              <MessageCircle size={20} className="mr-1" /> {post.comments}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-gray-600 hover:text-green-500">
                  <Share2 size={20} className="mr-1" /> Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => postActions.handleShare(post.id, 'WhatsApp')}>
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => postActions.handleShare(post.id, 'Instagram')}>
                  Instagram
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => postActions.handleShare(post.id, 'Facebook')}>
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => postActions.handleShare(post.id, 'Message')}>
                  Message
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => postActions.handleShare(post.id, 'More')}>
                  More options
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={() => postActions.handleAddToStory(post.id)} className="flex items-center text-gray-600 hover:text-purple-500">
              <Plus size={20} className="mr-1" /> Add to Story
            </Button>
            <Button variant="ghost" onClick={() => postActions.handleFollow(posts, post.id, setPosts)} className="flex items-center text-gray-600 hover:text-blue-500">
              <UserPlus size={20} className="mr-1" /> Follow ({post.followers})
            </Button>
            <Button variant="ghost" onClick={() => postActions.handleViewComments(posts, post.id)} className="flex items-center text-gray-600 hover:text-yellow-500">
              <MessageCircle size={20} className="mr-1" /> View Comments
            </Button>
            <Button variant="ghost" onClick={postActions.handleVoiceMessage} className="flex items-center text-gray-600 hover:text-green-500">
              <Mic size={20} className="mr-1" /> Voice Message
            </Button>
            <Button variant="ghost" onClick={postActions.handleCall} className="flex items-center text-gray-600 hover:text-purple-500">
              <Phone size={20} className="mr-1" /> Call
            </Button>
          </div>
          {showCommentInput === post.id && (
            <div className="mt-4 flex">
              <Input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="flex-grow mr-2"
              />
              <Button onClick={() => submitComment(post.id)}>Submit</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;