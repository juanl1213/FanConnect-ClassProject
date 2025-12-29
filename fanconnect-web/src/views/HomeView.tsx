import { useMemo, useState } from 'react';
import { useEventsQuery } from '../api/queries';
import type { Event } from '../types';

interface Props {
  onEventSelect: (id: string) => void;
}

type ViewMode = 'list' | 'map';

const leagues = ['all', 'Premier League', 'Champions League', 'La Liga', 'Serie A'];

function HomeView({ onEventSelect }: Props) {
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { data: events = [], isLoading, isError, refetch } = useEventsQuery();

  const filteredEvents = useMemo(() => {
    if (selectedLeague === 'all') return events;
    return events.filter((evt) => evt.league === selectedLeague);
  }, [events, selectedLeague]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card gradient-bg" style={{ color: '#fff', padding: 18 }}>
        <h2 style={{ margin: 0, fontSize: 22 }}>Find Your Match Crew! ⚽</h2>
        <p style={{ margin: '6px 0 0', opacity: 0.9 }}>Connect with fans attending games near you</p>
      </div>

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {leagues.map((league) => (
          <button
            key={league}
            className="pill"
            onClick={() => setSelectedLeague(league)}
            style={{
              background: selectedLeague === league ? '#2563eb' : '#e2e8f0',
              color: selectedLeague === league ? '#fff' : '#0f172a',
              border: 'none'
            }}
          >
            {league === 'all' ? 'All Leagues' : league}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
        <button
          className="pill"
          style={{
            background: viewMode === 'list' ? '#2563eb' : '#e2e8f0',
            color: viewMode === 'list' ? '#fff' : '#0f172a'
          }}
          onClick={() => setViewMode('list')}
        >
          📅 List View
        </button>
        <button
          className="pill"
          style={{
            background: viewMode === 'map' ? '#2563eb' : '#e2e8f0',
            color: viewMode === 'map' ? '#fff' : '#0f172a'
          }}
          onClick={() => setViewMode('map')}
        >
          🗺️ Map View
        </button>
      </div>

      {isLoading && (
        <div className="card" style={{ padding: 16 }}>
          <p style={{ margin: 0, color: '#64748b' }}>Loading events…</p>
        </div>
      )}

      {isError && (
        <div className="card" style={{ padding: 16 }}>
          <p style={{ margin: 0, color: '#b91c1c' }}>Could not load events.</p>
          <button className="pill" style={{ marginTop: 8, background: '#e2e8f0' }} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {viewMode === 'list' ? (
            <div className="grid" style={{ gap: 14 }}>
              {filteredEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} onSelect={onEventSelect} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <h3 style={{ marginTop: 0 }}>Map View</h3>
              <p style={{ color: '#64748b' }}>Interactive map showing nearby events and venues.</p>
              <div style={{ height: 260, borderRadius: 14, background: '#e2e8f0' }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface CardProps {
  event: Event;
  onSelect: (id: string) => void;
}

function EventCard({ event, onSelect }: CardProps) {
  return (
    <button className="card" onClick={() => onSelect(event.id)} style={{ textAlign: 'left', padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 180, background: '#e2e8f0' }}>
        <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span
          className="pill"
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: '#fff',
            color: '#0f172a'
          }}
        >
          {event.league}
        </span>
      </div>
      <div style={{ padding: 16, display: 'grid', gap: 10 }}>
        <div>
          <h3 style={{ margin: 0 }}>{`${event.homeTeam} vs ${event.awayTeam}`}</h3>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>
            {event.date} • {event.time}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: '#64748b', fontSize: 14 }}>
          <span>📍</span>
          <span>
            {event.venue} • {event.distance}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
          <div style={{ color: '#2563eb', fontWeight: 600 }}>👥 {event.attendees} fans going</div>
          <span
            className="pill"
            style={{
              background: event.venueType === 'stadium' ? '#2563eb' : '#e2e8f0',
              color: event.venueType === 'stadium' ? '#fff' : '#0f172a'
            }}
          >
            {event.venueType === 'stadium' && '🏟️ Stadium'}
            {event.venueType === 'bar' && '🍺 Bar'}
            {event.venueType === 'screening' && '📺 Screening'}
          </span>
        </div>
      </div>
    </button>
  );
}

export default HomeView;

