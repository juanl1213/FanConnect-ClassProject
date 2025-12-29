import { useState } from 'react';
import { goalBuddies, pastProfileEvents, upcomingProfileEvents } from '../data';
import type { GoalBuddy, ProfileEvent } from '../types';

type ProfileTab = 'upcoming' | 'past' | 'buddies';

interface Props {
  onBack: () => void;
  onSettings: () => void;
  onSignOut: () => void;
}

function ProfileView({ onBack, onSettings, onSignOut }: Props) {
  const [tab, setTab] = useState<ProfileTab>('upcoming');

  return (
    <div className="grid" style={{ gap: 14 }}>
      <header className="gradient-bg" style={{ color: '#fff', padding: 18, borderRadius: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={onBack}>
            ← Back
          </button>
          <button className="pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }} onClick={onSettings}>
            ⚙️ Settings
          </button>
        </div>
        <div style={{ display: 'grid', placeItems: 'center', gap: 10, marginTop: 12 }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: '#fff',
              color: '#2563eb',
              display: 'grid',
              placeItems: 'center',
              fontSize: 32,
              fontWeight: 800
            }}
          >
            YU
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0 }}>Your Name</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>@yourname</p>
            <p style={{ margin: '6px 0 0', color: '#86efac', fontWeight: 700 }}>✔️ Verified Account</p>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <Stat label="Events Attended" value="12" />
            <Stat label="GoalBuddies" value="28" />
            <Stat label="Rating ⭐" value="4.8" />
          </div>
        </div>
      </header>

      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Favorite Team</p>
          <button className="pill" style={{ background: '#e2e8f0' }}>
            Edit
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 10 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#ef4444',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontWeight: 800
            }}
          >
            MU
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Manchester United</p>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Premier League</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>My Vibe</p>
          <button className="pill" style={{ background: '#e2e8f0' }}>
            Edit
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <span className="pill" style={{ background: '#ffedd5', color: '#ea580c' }}>
            Cheer squad
          </span>
          <span className="pill" style={{ background: '#dbeafe', color: '#2563eb' }}>
            Social
          </span>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <TabButton label="Upcoming" active={tab === 'upcoming'} onClick={() => setTab('upcoming')} />
          <TabButton label="Past" active={tab === 'past'} onClick={() => setTab('past')} />
          <TabButton label="Buddies" active={tab === 'buddies'} onClick={() => setTab('buddies')} />
        </div>
        <div style={{ padding: 14 }}>
          {tab === 'upcoming' && <EventsList events={upcomingProfileEvents} mode="upcoming" />}
          {tab === 'past' && <EventsList events={pastProfileEvents} mode="past" />}
          {tab === 'buddies' && <BuddiesList buddies={goalBuddies} />}
        </div>
      </div>

      <div className="card" style={{ padding: 14, display: 'grid', gap: 10 }}>
        <p style={{ margin: 0, fontWeight: 700 }}>Achievements</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Achievement emoji="🏆" label="First Match" color="#facc15" />
          <Achievement emoji="🤝" label="Social Butterfly" color="#2563eb" />
          <Achievement emoji="⭐" label="Top Rated" color="#22c55e" />
        </div>
      </div>

      <div className="card" style={{ padding: 14, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="pill" style={{ background: '#fee2e2', color: '#b91c1c' }} onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ margin: 0, fontWeight: 800 }}>{value}</p>
      <p style={{ margin: 0, opacity: 0.8, fontSize: 12 }}>{label}</p>
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className="pill"
      style={{
        borderRadius: 0,
        background: active ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : '#fff',
        color: active ? '#fff' : '#0f172a',
        borderBottom: active ? '2px solid transparent' : '1px solid #e2e8f0'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function EventsList({ events, mode }: { events: ProfileEvent[]; mode: 'upcoming' | 'past' }) {
  return (
    <div className="grid" style={{ gap: 10 }}>
      {events.map((evt) => (
        <div key={evt.id} className="card" style={{ padding: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{evt.title}</p>
            <span className="pill" style={{ background: '#e2e8f0' }}>
              {mode === 'upcoming' ? 'Going' : 'Attended'}
            </span>
          </div>
          <p style={{ margin: '4px 0', color: '#64748b' }}>{evt.date}</p>
          <p style={{ margin: '4px 0', color: '#64748b' }}>📍 {evt.venue}</p>
          {mode === 'upcoming' && evt.attendees !== undefined && (
            <p style={{ margin: '4px 0', color: '#2563eb' }}>👥 {evt.attendees} fans going</p>
          )}
          {mode === 'past' && evt.buddiesMet !== undefined && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: '4px 0', color: '#64748b' }}>Met {evt.buddiesMet} buddies</p>
              <button className="pill" style={{ background: '#e2e8f0' }}>
                ⭐ Review
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BuddiesList({ buddies }: { buddies: GoalBuddy[] }) {
  return (
    <div className="grid" style={{ gap: 10 }}>
      {buddies.map((buddy) => (
        <div key={buddy.id} className="card" style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
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
            {buddy.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{buddy.name}</p>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Met at {buddy.eventsMet} events</p>
          </div>
          <button className="pill" style={{ background: '#e2e8f0' }}>
            Message
          </button>
        </div>
      ))}
    </div>
  );
}

function Achievement({ emoji, label, color }: { emoji: string; label: string; color: string }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: 12, borderRadius: 12, background: `${color}26` }}>
      <div style={{ fontSize: 24 }}>{emoji}</div>
      <p style={{ margin: '6px 0 0', color: '#475569' }}>{label}</p>
    </div>
  );
}

export default ProfileView;

