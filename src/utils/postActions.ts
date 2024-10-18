import { toast } from 'sonner';
import { Post } from '../types/post';

export const handleLike = (posts: Post[], postId: string, setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  setPosts(posts.map(post => 
    post.id === postId ? { ...post, likes: post.likes + 1 } : post
  ));
  toast.success('Post liked!');
};

export const handleShare = (postId: string, platform: string) => {
  switch (platform) {
    case 'WhatsApp':
      window.open(`https://wa.me/?text=Check out this post: ${window.location.origin}/post/${postId}`, '_blank');
      break;
    case 'Instagram':
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
      toast.success('Link copied to clipboard. You can now share it on Instagram.');
      break;
    case 'Facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/post/${postId}`)}`, '_blank');
      break;
    case 'Message':
      window.location.href = '/messages';
      break;
    default:
      toast.info(`Sharing post ${postId} on ${platform}`);
  }
};

export const handleAddToStory = (postId: string) => {
  toast.success(`Added post ${postId} to your story!`);
};

export const handleFollow = (posts: Post[], postId: string, setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  setPosts(posts.map(post =>
    post.id === postId ? { ...post, followers: post.followers + 1 } : post
  ));
  toast.success('Followed successfully!');
};

export const handleViewComments = (posts: Post[], postId: string) => {
  const post = posts.find(p => p.id === postId);
  if (post) {
    toast.info(`Viewing ${post.comments} comments for post ${postId}`);
  }
};

export const handleVoiceMessage = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => {
      toast.success('Microphone enabled. You can now record a voice message.');
    })
    .catch(() => {
      toast.error('Unable to access the microphone. Please check your permissions.');
    });
};

export const handleCall = () => {
  if ('contacts' in navigator && navigator.contacts?.select) {
    navigator.contacts.select(['tel'])
      .then((contacts: Contact[]) => {
        if (contacts.length > 0 && contacts[0].tel && contacts[0].tel.length > 0) {
          toast.success(`Calling ${contacts[0].tel[0]}`);
        } else {
          toast.error('No contact selected or no phone number available.');
        }
      })
      .catch(() => {
        toast.error('Unable to access contacts. Please check your permissions.');
      });
  } else {
    toast.error('Contacts API not supported in this browser.');
  }
};