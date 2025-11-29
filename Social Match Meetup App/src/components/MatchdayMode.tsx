import { useState } from 'react';
import { ArrowLeft, Camera, Heart, MessageCircle, Share2, Trophy, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah M.',
    userAvatar: 'SM',
    content: 'GOALLLLLL! ⚽🔴 What an opener from Rashford!',
    timestamp: '2 min ago',
    likes: 23,
    comments: 5,
    isLiked: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'James K.',
    userAvatar: 'JK',
    content: 'The atmosphere here is INSANE! 🔥',
    image: 'https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NjIyNDQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '5 min ago',
    likes: 41,
    comments: 8,
    isLiked: false
  },
  {
    id: '3',
    userId: '5',
    userName: 'Mia T.',
    userAvatar: 'MT',
    content: 'Pre-match meetup was amazing! Love this community 💙',
    timestamp: '12 min ago',
    likes: 18,
    comments: 3,
    isLiked: true
  },
  {
    id: '4',
    userId: '3',
    userName: 'Emma R.',
    userAvatar: 'ER',
    content: 'First time at Old Trafford and it did not disappoint! Thanks everyone for the warm welcome 🙏',
    timestamp: '18 min ago',
    likes: 34,
    comments: 12,
    isLiked: true
  }
];

interface MatchdayModeProps {
  eventId: string;
  onBack: () => void;
}

export function MatchdayMode({ eventId, onBack }: MatchdayModeProps) {
  const [posts, setPosts] = useState(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [showPostInput, setShowPostInput] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: String(posts.length + 1),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'YU',
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowPostInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm">LIVE</span>
            </div>
            <h3>Man Utd vs Liverpool</h3>
          </div>
        </div>

        {/* Live Score */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="text-center flex-1">
              <h3 className="mb-1">Man Utd</h3>
              <div className="text-4xl">2</div>
            </div>
            
            <div className="text-center px-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">67'</span>
              </div>
              <Badge variant="secondary" className="bg-red-500 text-white border-none">
                2nd Half
              </Badge>
            </div>
            
            <div className="text-center flex-1">
              <h3 className="mb-1">Liverpool</h3>
              <div className="text-4xl">1</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowPostInput(!showPostInput)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Share Reaction
          </Button>
          <Button variant="outline" size="icon">
            <Camera className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Post Input */}
      {showPostInput && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                YU
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's happening in the match? ⚽"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowPostInput(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handlePost} disabled={!newPostContent.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-3">
        <p className="text-xs text-gray-600 text-center">
          🔒 DMs from strangers are disabled during Matchday Mode for your safety
        </p>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {post.userAvatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="text-sm">{post.userName}</h4>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="mb-3">{post.content}</p>

            {/* Post Image */}
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt="Post image"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 text-sm ${
                  post.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                } transition-colors`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </Card>
        ))}

        {/* End of Feed */}
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-sm">You're all caught up!</p>
          <p className="text-gray-500 text-xs mt-1">Check back for more match reactions</p>
        </div>
      </div>
    </div>
  );
}
