import { liveMatches, upcomingMatches } from '../data';
import type { LiveMatch } from '../types';

interface Props {
  onStartMatchday: (eventId: string) => void;
}

function LiveView({ onStartMatchday }: Props) {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="card" style={{ padding: 18 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>📈</span>
          <div>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700 }}>Live & In Progress</p>
            <p style={{ margin: 0, color: '#64748b' }}>Jump into an ongoing matchday</p>
          </div>
        </header>
        <div className="grid" style={{ gap: 12 }}>
          {liveMatches.length === 0 && (
            <p style={{ margin: 0, color: '#94a3b8' }}>No live matches right now.</p>
          )}
          {liveMatches.map((match) => (
            <LiveCard key={match.id} match={match} onStart={onStartMatchday} />
          ))}
        </div>
      </section>

      <section className="card" style={{ padding: 18 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 20 }}>⏰</span>
          <div>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700 }}>Starting Soon</p>
            <p style={{ margin: 0, color: '#64748b' }}>Plan your matchday crew</p>
          </div>
        </header>
        <div className="grid" style={{ gap: 12 }}>
          {upcomingMatches.map((match) => (
            <UpcomingCard key={match.id} match={match} onStart={onStartMatchday} />
          ))}
        </div>
      </section>
    </div>
  );
}

function LiveCard({ match, onStart }: { match: LiveMatch; onStart: (id: string) => void }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 120, background: '#e2e8f0', opacity: 0.8 }}>
        <img src={match.imageUrl} alt={match.homeTeam} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <TeamScore name={match.homeTeam} score={match.homeScore} />
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>-</div>
            <TeamScore name={match.awayTeam} score={match.awayScore} />
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <StatusBadge status={match.status} />
            {match.minute && match.status !== 'halftime' && (
              <span className="pill" style={{ background: '#0f172a', color: '#fff' }}>
                {match.minute}
              </span>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: 14, display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, color: '#2563eb', fontWeight: 600 }}>👥 {match.attendees} fans watching together</p>
          <span className="pill" style={{ background: '#e2e8f0' }}>
            {match.league}
          </span>
        </div>
        <button
          className="auth-primary"
          style={{ width: '100%', height: 44, borderRadius: 12 }}
          onClick={() => onStart(match.id)}
        >
          🔴 Join Matchday Mode
        </button>
      </div>
    </div>
  );
}

function UpcomingCard({ match, onStart }: { match: LiveMatch; onStart: (id: string) => void }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', background: '#e2e8f0' }}>
          <img src={match.imageUrl} alt={match.homeTeam} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>{`${match.homeTeam} vs ${match.awayTeam}`}</h3>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>Kicks off at {match.minute}</p>
          <p style={{ margin: '4px 0 0', color: '#2563eb', fontWeight: 600 }}>👥 {match.attendees} fans going</p>
        </div>
        <StatusBadge status={match.status} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        <button
          className="pill"
          style={{ background: '#e2e8f0', color: '#0f172a', border: 'none' }}
          onClick={() => onStart(match.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function TeamScore({ name, score }: { name: string; score: number }) {
  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <div style={{ fontSize: 14 }}>{name}</div>
      <div style={{ fontSize: 30, fontWeight: 800 }}>{score}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: LiveMatch['status'] }) {
  if (status === 'live') {
    return (
      <span className="pill" style={{ background: '#ef4444', color: '#fff' }}>
        LIVE
      </span>
    );
  }
  if (status === 'halftime') {
    return (
      <span className="pill" style={{ background: '#f97316', color: '#fff' }}>
        Half Time
      </span>
    );
  }
  return (
    <span className="pill" style={{ background: '#e2e8f0', color: '#0f172a' }}>
      Upcoming
    </span>
  );
}

export default LiveView;

