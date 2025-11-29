import { useState } from 'react';
import { Home, Search, MessageCircle, User, MapPin, Calendar, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { EventDiscovery } from './components/EventDiscovery';
import { EventDetail } from './components/EventDetail';
import { GroupChat } from './components/GroupChat';
import { UserProfile } from './components/UserProfile';
import { MatchdayMode } from './components/MatchdayMode';
import { SearchView } from './components/SearchView';
import { LiveView } from './components/LiveView';
import { ChatsView } from './components/ChatsView';

export default function App() {
  const [currentView, setCurrentView] = useState<'discovery' | 'event-detail' | 'chat' | 'matchday' | 'profile' | 'search' | 'live' | 'chats'>('discovery');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('event-detail');
  };

  const handleJoinChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setCurrentView('chat');
  };

  const handleStartMatchday = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('matchday');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">⚽</span>
            </div>
            <h1 className="text-xl tracking-tight">GoalGather</h1>
          </div>
          <button 
            onClick={() => setCurrentView('profile')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {currentView === 'discovery' && (
          <EventDiscovery 
            onEventSelect={handleEventSelect}
          />
        )}

        {currentView === 'search' && (
          <SearchView 
            onEventSelect={handleEventSelect}
          />
        )}

        {currentView === 'live' && (
          <LiveView 
            onStartMatchday={handleStartMatchday}
          />
        )}

        {currentView === 'chats' && (
          <ChatsView 
            onChatSelect={handleJoinChat}
          />
        )}
        
        {currentView === 'event-detail' && selectedEventId && (
          <EventDetail 
            eventId={selectedEventId}
            onBack={() => setCurrentView('discovery')}
            onJoinChat={handleJoinChat}
            onStartMatchday={handleStartMatchday}
          />
        )}

        {currentView === 'chat' && selectedChatId && (
          <GroupChat 
            chatId={selectedChatId}
            onBack={() => setCurrentView('chats')}
          />
        )}

        {currentView === 'matchday' && selectedEventId && (
          <MatchdayMode 
            eventId={selectedEventId}
            onBack={() => setCurrentView('live')}
          />
        )}

        {currentView === 'profile' && (
          <UserProfile 
            onBack={() => setCurrentView('discovery')}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-around p-2">
          <button
            onClick={() => setCurrentView('discovery')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentView === 'discovery' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Discover</span>
          </button>
          
          <button
            onClick={() => setCurrentView('search')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentView === 'search' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
          
          <button
            onClick={() => setCurrentView('live')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentView === 'live' || currentView === 'matchday' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Live</span>
          </button>
          
          <button
            onClick={() => setCurrentView('chats')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentView === 'chats' || currentView === 'chat' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Chats</span>
          </button>
          
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentView === 'profile' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
