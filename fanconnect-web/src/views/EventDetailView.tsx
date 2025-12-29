import { attendees as mockAttendees } from '../data';
import type { Attendee, Event } from '../types';

interface Props {
  event: Event;
  onBack: () => void;
  onJoinChat: (id: string) => void;
  onStartMatchday: (id: string) => void;
}

function EventDetailView({ event, onBack, onJoinChat, onStartMatchday }: Props) {
  const attendees: Attendee[] = mockAttendees;

  return (
    <div className="grid" style={{ gap: 16 }}>
      <button className="pill" style={{ background: '#e2e8f0', width: 'fit-content' }} onClick={onBack}>
        ← Back to Events
      </button>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 240, background: '#e2e8f0' }}>
          <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))'
            }}
          />
          <div style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff' }}>
            <span className="pill" style={{ background: '#fff', color: '#0f172a' }}>
              {event.league}
            </span>
            <h2 style={{ margin: '8px 0 0' }}>{`${event.homeTeam} vs ${event.awayTeam}`}</h2>
            <p style={{ margin: '4px 0 0', opacity: 0.9 }}>
              {event.date} • {event.time}
            </p>
          </div>
        </div>

        <div style={{ padding: 18, display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#eef2ff', display: 'grid', placeItems: 'center', color: '#2563eb' }}>
              📍
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>{event.venue}</p>
              <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                {event.location} • {event.distance} away
              </p>
            </div>
            <span className="pill" style={{ background: '#e2e8f0', marginLeft: 'auto' }}>
              {event.venueType === 'stadium' && '🏟️ Stadium'}
              {event.venueType === 'bar' && '🍺 Bar'}
              {event.venueType === 'screening' && '📺 Screening'}
            </span>
          </div>

          <div>
            <h3 style={{ margin: '0 0 6px' }}>About This Match</h3>
            <p style={{ margin: 0, color: '#475569' }}>
              The biggest rivalry in English football! Join fellow fans for this epic showdown.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              padding: 12,
              borderRadius: 12,
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8'
            }}
          >
            <span>🛡️</span>
            <p style={{ margin: 0 }}>
              Safety first: All users are verified. Meet in public places and report suspicious behavior.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Find Companions</h3>
              <p style={{ margin: 0, color: '#64748b' }}>{event.attendees} fans are going</p>
            </div>
            <div className="grid" style={{ gap: 10, marginTop: 10 }}>
              {attendees.map((attendee) => (
                <AttendeeCard key={attendee.id} attendee={attendee} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 14, display: 'grid', gap: 10 }}>
        <button className="auth-primary" style={{ height: 48, borderRadius: 12 }} onClick={() => onJoinChat(event.id)}>
          💬 Join Group Chat
        </button>
        <button
          className="pill"
          style={{ background: '#fff', border: '1px solid #e2e8f0', height: 48, fontWeight: 700 }}
          onClick={() => onStartMatchday(event.id)}
        >
          🔴 Start Matchday Mode
        </button>
      </div>
    </div>
  );
}

function AttendeeCard({ attendee }: { attendee: Attendee }) {
  return (
    <div className="card" style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700
        }}
      >
        {attendee.avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <p style={{ margin: 0, fontWeight: 700 }}>{attendee.name}</p>
          {attendee.verified && <span style={{ color: '#2563eb' }}>✔️</span>}
        </div>
        <p style={{ margin: '4px 0 0', color: '#64748b' }}>
          {attendee.favoriteTeam} • {attendee.ageRange}
        </p>
        <span className="pill" style={{ background: '#e2e8f0', color: '#0f172a' }}>
          {attendee.vibe}
        </span>
      </div>
      <button className="pill" style={{ background: '#e2e8f0', border: 'none' }}>
        Message
      </button>
    </div>
  );
}

export default EventDetailView;

