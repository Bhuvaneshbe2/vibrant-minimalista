export interface Post {
  id: string;
  type: 'video' | 'photo' | 'story';
  content: string;
  likes: number;
  comments: number;
  author: string;
  followers: number;
}

export const getIcon = (type: Post['type']) => {
  switch (type) {
    case 'video':
      return 'video-icon';
    case 'photo':
      return 'photo-icon';
    case 'story':
      return 'story-icon';
    default:
      return 'default-icon';
  }
};