import { MessageCircle, Users, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ChatPreview {
  id: string;
  eventName: string;
  homeTeam: string;
  awayTeam: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  members: number;
  isActive: boolean;
}

const activeChats: ChatPreview[] = [
  {
    id: '1',
    eventName: 'Man Utd vs Liverpool',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    lastMessage: 'Emma: This is my first time at Old Trafford! So excited 🎉',
    lastMessageTime: '2m ago',
    unreadCount: 3,
    members: 47,
    isActive: true
  },
  {
    id: '2',
    eventName: 'Real Madrid vs Bayern',
    homeTeam: 'Real Madrid',
    awayTeam: 'Bayern Munich',
    lastMessage: 'Alex: See you all at the bar! 🍻',
    lastMessageTime: '15m ago',
    unreadCount: 1,
    members: 23,
    isActive: true
  }
];

const pastChats: ChatPreview[] = [
  {
    id: '3',
    eventName: 'Chelsea vs Arsenal',
    homeTeam: 'Chelsea',
    awayTeam: 'Arsenal',
    lastMessage: 'Sarah: Thanks everyone, great match!',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    members: 31,
    isActive: false
  },
  {
    id: '4',
    eventName: 'Barcelona vs Real Madrid',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    lastMessage: 'Mike: What a game! 🔥',
    lastMessageTime: '5 days ago',
    unreadCount: 0,
    members: 19,
    isActive: false
  }
];

interface ChatsViewProps {
  onChatSelect: (chatId: string) => void;
}

export function ChatsView({ onChatSelect }: ChatsViewProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-2">Messages</h2>
        <p className="text-gray-600 text-sm">Your group chats and event discussions</p>
      </div>

      {/* Active Chats */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3>Active Chats</h3>
        </div>

        {activeChats.length > 0 ? (
          <div className="space-y-3">
            {activeChats.map((chat) => (
              <Card
                key={chat.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        <MessageCircle className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    {chat.isActive && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4>{chat.eventName}</h4>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {chat.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {chat.lastMessage}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{chat.members} members</span>
                      </div>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white h-5 px-2">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mb-2">No active chats</h3>
            <p className="text-gray-600 text-sm">Join an event to start chatting with fans</p>
          </Card>
        )}
      </div>

      {/* Past Chats */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <h3>Past Events</h3>
        </div>

        <div className="space-y-3">
          {pastChats.map((chat) => (
            <Card
              key={chat.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow opacity-75"
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    <MessageCircle className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4>{chat.eventName}</h4>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {chat.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {chat.lastMessage}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{chat.members} members</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
