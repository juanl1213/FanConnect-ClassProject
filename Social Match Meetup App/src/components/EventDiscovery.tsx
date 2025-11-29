import { useState } from 'react';
import { MapPin, Calendar, Users, Filter, Map } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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

const mockEvents: Event[] = [
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

interface EventDiscoveryProps {
  onEventSelect: (eventId: string) => void;
}

export function EventDiscovery({ onEventSelect }: EventDiscoveryProps) {
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredEvents = selectedLeague === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.league === selectedLeague);

  const leagues = ['all', 'Premier League', 'Champions League', 'La Liga', 'Serie A'];

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl mb-2">Find Your Match Crew! ⚽</h2>
        <p className="text-blue-100">Connect with fans attending games near you</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {leagues.map((league) => (
          <Button
            key={league}
            variant={selectedLeague === league ? 'default' : 'outline'}
            onClick={() => setSelectedLeague(league)}
            className="whitespace-nowrap"
          >
            {league === 'all' ? 'All Leagues' : league}
          </Button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          onClick={() => setViewMode('list')}
          className="flex-1"
        >
          <Calendar className="w-4 h-4 mr-2" />
          List View
        </Button>
        <Button
          variant={viewMode === 'map' ? 'default' : 'outline'}
          onClick={() => setViewMode('map')}
          className="flex-1"
        >
          <Map className="w-4 h-4 mr-2" />
          Map View
        </Button>
      </div>

      {/* Event List */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
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
          ))}
        </div>
      )}

      {/* Map View Placeholder */}
      {viewMode === 'map' && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Map className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="mb-2">Map View</h3>
          <p className="text-gray-600 text-sm">Interactive map showing nearby events and venues</p>
          <div className="mt-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map will display event locations here</p>
          </div>
        </Card>
      )}
    </div>
  );
}
