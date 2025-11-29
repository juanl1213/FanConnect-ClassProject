import { useState } from 'react';
import { ArrowLeft, Send, Image, Smile, Users, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isIcebreaker?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'system',
    senderName: 'GoalGather',
    senderAvatar: '⚽',
    message: 'Welcome to the Manchester United vs Liverpool match chat! Use these icebreakers to get started:',
    timestamp: '14:20',
    isIcebreaker: false
  },
  {
    id: '2',
    senderId: 'system',
    senderName: 'Icebreaker',
    senderAvatar: '💬',
    message: 'Where are you all sitting? Let\'s try to meet up!',
    timestamp: '14:21',
    isIcebreaker: true
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Sarah M.',
    senderAvatar: 'SM',
    message: 'I\'m in the Stretford End! Section 127. Anyone nearby?',
    timestamp: '14:23'
  },
  {
    id: '4',
    senderId: '2',
    senderName: 'James K.',
    senderAvatar: 'JK',
    message: 'I\'m in 125! Right next to you Sarah 👋',
    timestamp: '14:24'
  },
  {
    id: '5',
    senderId: '5',
    senderName: 'Mia T.',
    senderAvatar: 'MT',
    message: 'Anyone planning to grab food before the match? There\'s a great pub nearby',
    timestamp: '14:28'
  },
  {
    id: '6',
    senderId: '4',
    senderName: 'David L.',
    senderAvatar: 'DL',
    message: 'I\'m down! What time and where?',
    timestamp: '14:30'
  },
  {
    id: '7',
    senderId: '3',
    senderName: 'Emma R.',
    senderAvatar: 'ER',
    message: 'This is my first time at Old Trafford! So excited 🎉',
    timestamp: '14:32'
  }
];

const icebreakers = [
  "Where are you sitting?",
  "Who's bringing the banner?",
  "Want to meet before kickoff?",
  "Anyone need a ride?"
];

interface GroupChatProps {
  chatId: string;
  onBack: () => void;
}

export function GroupChat({ chatId, onBack }: GroupChatProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'YU',
      message: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleIcebreaker = (icebreaker: string) => {
    setInputValue(icebreaker);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h3>Man Utd vs Liverpool</h3>
            <p className="text-sm text-gray-600">47 members</p>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Icebreaker Suggestions */}
      <div className="bg-blue-50 border-b border-blue-100 p-3">
        <p className="text-xs text-gray-600 mb-2">💡 Icebreaker prompts:</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {icebreakers.map((icebreaker, index) => (
            <button
              key={index}
              onClick={() => handleIcebreaker(icebreaker)}
              className="px-3 py-1 bg-white text-sm rounded-full whitespace-nowrap hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              {icebreaker}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => {
          const isSystem = message.senderId === 'system';
          const isCurrentUser = message.senderId === 'current-user';

          if (isSystem) {
            return (
              <div key={message.id} className="flex justify-center">
                <Card className={`max-w-md p-3 text-center ${message.isIcebreaker ? 'bg-blue-50 border-blue-200' : 'bg-gray-100'}`}>
                  <p className="text-sm text-gray-600">{message.message}</p>
                </Card>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isCurrentUser && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    {message.senderAvatar}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                {!isCurrentUser && (
                  <span className="text-xs text-gray-600 mb-1 px-3">{message.senderName}</span>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-3">{message.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="bg-yellow-50 border-t border-yellow-100 px-4 py-2">
        <p className="text-xs text-gray-600 text-center">
          🔒 DMs from strangers will be disabled during matchday for your safety
        </p>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Image className="w-5 h-5 text-gray-600" />
          </Button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Smile className="w-5 h-5 text-gray-600" />
          </Button>
          
          <Button
            onClick={handleSend}
            size="icon"
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
