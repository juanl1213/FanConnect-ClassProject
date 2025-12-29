import { useMemo, useState } from 'react';
import { useEventsQuery } from '../api/queries';
import type { Event, VenueType } from '../types';

interface Props {
  onEventSelect: (id: string) => void;
}

const venueFilters: { value: VenueType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Venues' },
  { value: 'stadium', label: '🏟️ Stadium' },
  { value: 'bar', label: '🍺 Bar' },
  { value: 'screening', label: '📺 Screening' }
];

function SearchView({ onEventSelect }: Props) {
  const [query, setQuery] = useState('');
  const [venueFilter, setVenueFilter] = useState<VenueType | 'all'>('all');
  const { data: events = [], isLoading, isError, refetch } = useEventsQuery();

  const filtered = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        !query ||
        evt.homeTeam.toLowerCase().includes(query.toLowerCase()) ||
        evt.awayTeam.toLowerCase().includes(query.toLowerCase()) ||
        evt.league.toLowerCase().includes(query.toLowerCase()) ||
        evt.venue.toLowerCase().includes(query.toLowerCase()) ||
        evt.location.toLowerCase().includes(query.toLowerCase());

      const matchesVenue = venueFilter === 'all' ? true : evt.venueType === venueFilter;
      return matchesSearch && matchesVenue;
    });
  }, [query, venueFilter]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <h2 style={{ margin: '0 0 6px' }}>Search Events</h2>
        <div
          style={{
            display: 'grid',
            gap: 10,
            gridTemplateColumns: '1fr',
            alignItems: 'center'
          }}
        >
          <div style={{ position: 'relative' }}>
            <input
              type="search"
              placeholder="Search teams, leagues, venues..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                padding: '0 12px',
                fontSize: 15
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 10,
                  background: 'none',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {venueFilters.map((filter) => (
              <button
                key={filter.value}
                className="pill"
                onClick={() => setVenueFilter(filter.value)}
                style={{
                  background: venueFilter === filter.value ? '#2563eb' : '#e2e8f0',
                  color: venueFilter === filter.value ? '#fff' : '#0f172a'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p style={{ margin: 0, color: '#64748b' }}>
        {filtered.length} {filtered.length === 1 ? 'result' : 'results'} found
      </p>

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
          {filtered.length === 0 ? (
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 600 }}>No results found</p>
              <p style={{ margin: '6px 0 0', color: '#64748b' }}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid" style={{ gap: 14 }}>
              {filtered.map((evt) => (
                <SearchResult key={evt.id} event={evt} onSelect={onEventSelect} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SearchResult({ event, onSelect }: { event: Event; onSelect: (id: string) => void }) {
  return (
    <button className="card" onClick={() => onSelect(event.id)} style={{ padding: 16, textAlign: 'left' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', background: '#e2e8f0' }}>
          <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>{`${event.homeTeam} vs ${event.awayTeam}`}</h3>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>
            {event.date} • {event.time}
          </p>
          <p style={{ margin: '4px 0 0', color: '#2563eb', fontWeight: 600 }}>👥 {event.attendees} fans going</p>
        </div>
        <span className="pill" style={{ background: '#e2e8f0', color: '#0f172a' }}>
          {event.league}
        </span>
      </div>
    </button>
  );
}

export default SearchView;

