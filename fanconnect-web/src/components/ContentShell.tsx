import { useMemo, useState } from 'react';
import './shell.css';
import { events as mockEvents } from '../data';
import type { Event } from '../types';
import HomeView from '../views/HomeView';
import SearchView from '../views/SearchView';
import LiveView from '../views/LiveView';
import EventDetailView from '../views/EventDetailView';
import ChatsView from '../views/ChatsView';
import GroupChatView from '../views/GroupChatView';
import MatchdayView from '../views/MatchdayView';
import ProfileView from '../views/ProfileView';
import SettingsView from '../views/SettingsView';

export type AppView =
  | 'discover'
  | 'search'
  | 'live'
  | 'chats'
  | 'eventDetail'
  | 'chat'
  | 'matchday'
  | 'profile'
  | 'settings';

interface Props {
  onSignOut: () => void;
}

function ContentShell({ onSignOut }: Props) {
  const [currentView, setCurrentView] = useState<AppView>('discover');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectedEvent: Event | undefined = useMemo(
    () => mockEvents.find((evt) => evt.id === selectedEventId) || mockEvents[0],
    [selectedEventId]
  );

  const showHeader = !['settings', 'chat', 'matchday', 'eventDetail'].includes(currentView);
  const showTabs = !['settings', 'chat', 'matchday', 'eventDetail'].includes(currentView);

  const handleEventSelect = (id: string) => {
    setSelectedEventId(id);
    setCurrentView('eventDetail');
  };

  const handleChatSelect = (id: string) => {
    setSelectedChatId(id);
    setCurrentView('chat');
  };

  const handleStartMatchday = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('matchday');
  };

  return (
    <div className="shell">
      {showHeader && (
        <header className="shell__header gradient-bg">
          <div className="shell__logo">
            <div className="shell__logo-mark">⚽</div>
            <div>
              <p className="shell__eyebrow">Find Your Match Crew!</p>
              <h1>FanConnect</h1>
            </div>
          </div>
          <button className="shell__avatar" onClick={() => setCurrentView('profile')}>
            😊
          </button>
        </header>
      )}

      <main className="shell__body">
        {currentView === 'discover' && <HomeView onEventSelect={handleEventSelect} />}
        {currentView === 'search' && <SearchView onEventSelect={handleEventSelect} />}
        {currentView === 'live' && <LiveView onStartMatchday={handleStartMatchday} />}
        {currentView === 'chats' && <ChatsView onChatSelect={handleChatSelect} />}
        {currentView === 'eventDetail' && selectedEvent && (
          <EventDetailView
            event={selectedEvent}
            onBack={() => setCurrentView('discover')}
            onJoinChat={handleChatSelect}
            onStartMatchday={handleStartMatchday}
          />
        )}
        {currentView === 'chat' && selectedChatId && (
          <GroupChatView chatId={selectedChatId} onBack={() => setCurrentView('chats')} />
        )}
        {currentView === 'matchday' && selectedEvent && (
          <MatchdayView event={selectedEvent} onBack={() => setCurrentView('live')} />
        )}
        {currentView === 'profile' && (
          <ProfileView
            onBack={() => setCurrentView('discover')}
            onSettings={() => setCurrentView('settings')}
            onSignOut={onSignOut}
          />
        )}
        {currentView === 'settings' && <SettingsView onBack={() => setCurrentView('profile')} />}
      </main>

      {showTabs && (
        <nav className="shell__tabs">
          <TabButton icon="house" label="Discover" active={currentView === 'discover'} onClick={() => setCurrentView('discover')} />
          <TabButton icon="search" label="Search" active={currentView === 'search'} onClick={() => setCurrentView('search')} />
          <TabButton icon="activity" label="Live" active={['live', 'matchday'].includes(currentView)} onClick={() => setCurrentView('live')} />
          <TabButton icon="message-circle" label="Chats" active={['chats', 'chat'].includes(currentView)} onClick={() => setCurrentView('chats')} />
          <TabButton icon="user" label="Profile" active={currentView === 'profile'} onClick={() => setCurrentView('profile')} />
        </nav>
      )}
    </div>
  );
}

interface TabProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ icon, label, active, onClick }: TabProps) {
  return (
    <button className={`tab ${active ? 'tab--active' : ''}`} onClick={onClick}>
      <span className="tab__icon" aria-hidden>
        {icon === 'house' && '🏠'}
        {icon === 'search' && '🔍'}
        {icon === 'activity' && '📈'}
        {icon === 'message-circle' && '💬'}
        {icon === 'user' && '👤'}
      </span>
      <span className="tab__label">{label}</span>
    </button>
  );
}

export default ContentShell;

