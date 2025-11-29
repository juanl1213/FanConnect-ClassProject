import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: string;
  title: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  venue: string;
  venueType: 'stadium' | 'bar' | 'screening';
  location: string;
  attendees: number;
  imageUrl: string;
  distance: string;
}

const allEvents: Event[] = [
  {
    id: '1',
    title: 'Premier League',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    date: 'Nov 9, 2024',
    time: '17:30',
    venue: 'Old Trafford',
    venueType: 'stadium',
    location: 'Manchester, UK',
    attendees: 47,
    imageUrl: 'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '2.3 km'
  },
  {
    id: '2',
    title: 'Champions League',
    homeTeam: 'Real Madrid',
    awayTeam: 'Bayern Munich',
    league: 'Champions League',
    date: 'Nov 6, 2024',
    time: '20:00',
    venue: 'The Red Lion Sports Bar',
    venueType: 'bar',
    location: 'London, UK',
    attendees: 23,
    imageUrl: 'https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYXIlMjB3YXRjaGluZyUyMGdhbWV8ZW58MXx8fHwxNzYyMjc4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '0.8 km'
  },
  {
    id: '3',
    title: 'La Liga',
    homeTeam: 'Barcelona',
    awayTeam: 'Atletico Madrid',
    league: 'La Liga',
    date: 'Nov 10, 2024',
    time: '15:00',
    venue: 'Community Center Screening',
    venueType: 'screening',
    location: 'Birmingham, UK',
    attendees: 15,
    imageUrl: 'https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NjIyNDQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '5.1 km'
  },
  {
    id: '4',
    title: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    date: 'Nov 7, 2024',
    time: '19:30',
    venue: 'Emirates Stadium',
    venueType: 'stadium',
    location: 'London, UK',
    attendees: 62,
    imageUrl: 'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '3.7 km'
  },
  {
    id: '5',
    title: 'Serie A',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    league: 'Serie A',
    date: 'Nov 8, 2024',
    time: '18:00',
    venue: 'Milano Sports Lounge',
    venueType: 'bar',
    location: 'Manchester, UK',
    attendees: 18,
    imageUrl: 'https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYXIlMjB3YXRjaGluZyUyMGdhbWV8ZW58MXx8fHwxNzYyMjc4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '1.2 km'
  }
];

interface SearchViewProps {
  onEventSelect: (eventId: string) => void;
}

export function SearchView({ onEventSelect }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [venueTypeFilter, setVenueTypeFilter] = useState<string>('all');

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVenue = venueTypeFilter === 'all' || event.venueType === venueTypeFilter;

    return matchesSearch && matchesVenue;
  });

  const clearSearch = () => {
    setSearchQuery('');
    setVenueTypeFilter('all');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Header */}
      <div>
        <h2 className="text-2xl mb-4">Search Events</h2>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams, leagues, venues..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Venue Type Filters */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm">Venue Type</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={venueTypeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setVenueTypeFilter('all')}
            size="sm"
          >
            All Venues
          </Button>
          <Button
            variant={venueTypeFilter === 'stadium' ? 'default' : 'outline'}
            onClick={() => setVenueTypeFilter('stadium')}
            size="sm"
          >
            🏟️ Stadium
          </Button>
          <Button
            variant={venueTypeFilter === 'bar' ? 'default' : 'outline'}
            onClick={() => setVenueTypeFilter('bar')}
            size="sm"
          >
            🍺 Bar
          </Button>
          <Button
            variant={venueTypeFilter === 'screening' ? 'default' : 'outline'}
            onClick={() => setVenueTypeFilter('screening')}
            size="sm"
          >
            📺 Screening
          </Button>
        </div>
      </div>

      {/* Clear Filters */}
      {(searchQuery || venueTypeFilter !== 'all') && (
        <Button variant="ghost" onClick={clearSearch} className="w-full">
          Clear all filters
        </Button>
      )}

      {/* Results */}
      <div>
        <p className="text-sm text-gray-600 mb-3">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'result' : 'results'} found
        </p>

        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onEventSelect(event.id)}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={event.imageUrl}
                    alt={`${event.homeTeam} vs ${event.awayTeam}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-gray-900">
                      {event.league}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white mb-1">
                      {event.homeTeam} vs {event.awayTeam}
                    </h3>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{event.venue} • {event.distance}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        <span className="text-blue-600">{event.attendees}</span> fans going
                      </span>
                    </div>
                    <Badge variant={event.venueType === 'stadium' ? 'default' : 'secondary'}>
                      {event.venueType === 'stadium' ? '🏟️ Stadium' : event.venueType === 'bar' ? '🍺 Bar' : '📺 Screening'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2">No results found</h3>
              <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
