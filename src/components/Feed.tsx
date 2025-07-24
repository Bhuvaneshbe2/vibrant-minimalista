import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Upload, Plus, UserPlus, Phone, Send, Reply } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
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

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Post['type'] | 'all'>('all');
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating fetching posts from an API
    const fetchPosts = () => {
      const mockPosts: Post[] = [
        { id: '1', type: 'photo', content: 'https://picsum.photos/seed/1/400/300', likes: 15, comments: 3, author: 'User1', followers: 100, isFollowed: false },
        { id: '2', type: 'video', content: 'https://www.youtube.com/shorts/dQw4w9WgXcQ', likes: 25, comments: 7, author: 'User2', followers: 200, isFollowed: false },
        { id: '3', type: 'story', content: 'This is a story post content', likes: 10, comments: 2, author: 'User3', followers: 150, isFollowed: false },
        { id: '4', type: 'photo', content: 'https://picsum.photos/seed/2/400/300', likes: 30, comments: 5, author: 'User4', followers: 300, isFollowed: false },
        { id: '5', type: 'video', content: 'https://www.instagram.com/reel/C1234567890', likes: 45, comments: 8, author: 'User5', followers: 250, isFollowed: false },
        { id: '6', type: 'video', content: 'https://youtu.be/dQw4w9WgXcQ', likes: 35, comments: 6, author: 'User6', followers: 180, isFollowed: false },
      ];
      setPosts(mockPosts);

      // Mock comments data
      const mockComments: Comment[] = [
        { id: '1', postId: '1', author: 'John Doe', content: 'Great photo!', timestamp: '2 hours ago', replies: [] },
        { id: '2', postId: '1', author: 'Jane Smith', content: 'Love it!', timestamp: '1 hour ago', replies: [
          { id: '3', postId: '1', author: 'User1', content: 'Thank you!', timestamp: '45 minutes ago', replies: [] }
        ]},
        { id: '4', postId: '2', author: 'Mike Johnson', content: 'Amazing video!', timestamp: '3 hours ago', replies: [] },
        { id: '5', postId: '2', author: 'Sarah Wilson', content: 'So cool!', timestamp: '2 hours ago', replies: [] },
        { id: '6', postId: '3', author: 'Tom Brown', content: 'Interesting story', timestamp: '1 hour ago', replies: [] },
      ];
      setComments(mockComments);
    };

    fetchPosts();
  }, []);

  const handleComment = (postId: string) => {
    setShowCommentInput(postId);
  };

  const submitComment = (postId: string) => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        postId,
        author: 'Current User',
        content: comment,
        timestamp: 'Just now',
        replies: []
      };

      if (replyTo) {
        setComments(prevComments => 
          prevComments.map(c => 
            c.id === replyTo 
              ? { ...c, replies: [...c.replies, newComment] }
              : c
          )
        );
        setReplyTo(null);
      } else {
        setComments(prevComments => [...prevComments, newComment]);
        setPosts(posts.map(post =>
          post.id === postId ? { ...post, comments: post.comments + 1 } : post
        ));
      }

      toast.success('Comment added successfully!');
      setComment('');
      setShowCommentInput(null);
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(showComments === postId ? null : postId);
  };

  const startReply = (commentId: string, postId: string) => {
    setReplyTo(commentId);
    setShowCommentInput(postId);
  };

  const renderComment = (comment: Comment, isReply: boolean = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-2' : 'mt-3'} p-3 bg-gray-50 rounded-lg`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-semibold text-sm">{comment.author}</div>
          <div className="text-gray-700 mt-1">{comment.content}</div>
          <div className="text-xs text-gray-500 mt-1">{comment.timestamp}</div>
        </div>
        {!isReply && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => startReply(comment.id, comment.postId)}
            className="text-xs"
          >
            <Reply size={12} className="mr-1" /> Reply
          </Button>
        )}
      </div>
      {comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  const handleUploadMedia = () => {
    toast.info('Media upload feature coming soon!');
  };

  const handleAddToStory = (postId: string) => {
    navigate('/story');
  };

  const handleCall = () => {
    navigate('/followers');
  };

  const renderVideoContent = (content: string) => {
    // YouTube video handling
    if (content.includes('youtube.com') || content.includes('youtu.be')) {
      let videoId = '';
      
      if (content.includes('youtu.be/')) {
        videoId = content.split('youtu.be/')[1].split('?')[0];
      } else if (content.includes('youtube.com/watch?v=')) {
        videoId = content.split('v=')[1].split('&')[0];
      } else if (content.includes('youtube.com/shorts/')) {
        videoId = content.split('shorts/')[1].split('?')[0];
      }
      
      const isShort = content.includes('/shorts/');
      const height = isShort ? "560" : "315";
      
      return (
        <iframe
          width="100%"
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md"
        ></iframe>
      );
    } 
    // Instagram video handling
    else if (content.includes('instagram.com')) {
      let embedUrl = '';
      
      if (content.includes('/p/') || content.includes('/reel/')) {
        // Remove trailing slash and add embed
        embedUrl = content.replace(/\/$/, '') + '/embed';
      } else {
        embedUrl = content + 'embed';
      }
      
      return (
        <iframe
          width="100%"
          height="400"
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
          className="rounded-md"
        ></iframe>
      );
    } 
    // Regular video files
    else {
      return (
        <video 
          src={content} 
          controls 
          autoPlay 
          muted 
          loop
          className="w-full rounded-md mb-4" 
        />
      );
    }
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
          <div className="flex justify-between items-center mb-2">
            <Button variant="ghost" onClick={() => postActions.handleFollow(posts, post.id, setPosts)} className={`flex items-center ${post.isFollowed ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`}>
              <UserPlus size={20} className="mr-1" /> {post.isFollowed ? 'Following' : 'Follow'} ({post.followers})
            </Button>
            <Button variant="ghost" onClick={() => handleAddToStory(post.id)} className="flex items-center text-gray-600 hover:text-purple-500">
              <Plus size={20} className="mr-1" /> Add to Story
            </Button>
            <Button variant="ghost" onClick={handleCall} className="flex items-center text-gray-600 hover:text-green-500">
              <Phone size={20} className="mr-1" /> Call
            </Button>
          </div>
          {post.type === 'photo' && (
            <img src={post.content} alt="Post content" className="w-full rounded-md mb-4" />
          )}
          {post.type === 'video' && renderVideoContent(post.content)}
          {post.type === 'story' && (
            <p className="mb-4">{post.content}</p>
          )}
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => postActions.handleLike(posts, post.id, setPosts)} className="flex items-center text-gray-600 hover:text-red-500">
              <Heart size={20} className="mr-1" /> {post.likes}
            </Button>
            <Button variant="ghost" onClick={() => toggleComments(post.id)} className="flex items-center text-gray-600 hover:text-blue-500">
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
          </div>
          
          {/* Comments Section */}
          {showComments === post.id && (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-semibold mb-3">Comments ({getPostComments(post.id).length})</h4>
              {getPostComments(post.id).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
              ) : (
                getPostComments(post.id).map(comment => renderComment(comment))
              )}
              <Button 
                onClick={() => handleComment(post.id)} 
                className="mt-3 w-full"
                variant="outline"
              >
                Add Comment
              </Button>
            </div>
          )}

          {showCommentInput === post.id && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex">
                <Input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={replyTo ? "Write your reply..." : "Write your comment..."}
                  className="flex-grow mr-2"
                />
                <Button onClick={() => submitComment(post.id)}>
                  <Send size={16} />
                </Button>
              </div>
              {replyTo && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setReplyTo(null)}
                  className="mt-2 text-xs"
                >
                  Cancel Reply
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
