import { Clock, TrendingUp, Users, Play } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'upcoming' | 'halftime';
  minute?: string;
  league: string;
  attendees: number;
  imageUrl: string;
}

const liveMatches: LiveMatch[] = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: '67\'',
    league: 'Premier League',
    attendees: 47,
    imageUrl: 'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Bayern Munich',
    homeScore: 1,
    awayScore: 1,
    status: 'halftime',
    minute: 'HT',
    league: 'Champions League',
    attendees: 23,
    imageUrl: 'https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYXIlMjB3YXRjaGluZyUyMGdhbWV8ZW58MXx8fHwxNzYyMjc4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const upcomingMatches: LiveMatch[] = [
  {
    id: '3',
    homeTeam: 'Barcelona',
    awayTeam: 'Atletico Madrid',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    minute: '15:00',
    league: 'La Liga',
    attendees: 15,
    imageUrl: 'https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NjIyNDQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    minute: '19:30',
    league: 'Premier League',
    attendees: 62,
    imageUrl: 'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

interface LiveViewProps {
  onStartMatchday: (eventId: string) => void;
}

export function LiveView({ onStartMatchday }: LiveViewProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <Badge className="bg-red-500 text-white border-none">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
            LIVE
          </Badge>
        );
      case 'halftime':
        return <Badge className="bg-orange-500 text-white border-none">Half Time</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Live Matches */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <h2 className="text-2xl">Live & In Progress</h2>
        </div>

        {liveMatches.length > 0 ? (
          <div className="space-y-4">
            {liveMatches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <div className="relative h-32">
                  <ImageWithFallback
                    src={match.imageUrl}
                    alt={`${match.homeTeam} vs ${match.awayTeam}`}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-6 mb-2">
                        <div className="text-center">
                          <div className="text-sm text-gray-700 mb-1">{match.homeTeam}</div>
                          <div className="text-3xl">{match.homeScore}</div>
                        </div>
                        <div className="text-2xl text-gray-400">-</div>
                        <div className="text-center">
                          <div className="text-sm text-gray-700 mb-1">{match.awayTeam}</div>
                          <div className="text-3xl">{match.awayScore}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        {getStatusBadge(match.status)}
                        {match.minute && match.status !== 'halftime' && (
                          <Badge variant="secondary">{match.minute}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span><span className="text-blue-600">{match.attendees}</span> fans watching together</span>
                    </div>
                    <Badge variant="outline">{match.league}</Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    onClick={() => onStartMatchday(match.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Join Matchday Mode
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mb-2">No live matches</h3>
            <p className="text-gray-600 text-sm">Check back during match times</p>
          </Card>
        )}
      </div>

      {/* Upcoming Today */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl">Starting Soon</h3>
        </div>

        <div className="space-y-4">
          {upcomingMatches.map((match) => (
            <Card key={match.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={match.imageUrl}
                    alt={`${match.homeTeam} vs ${match.awayTeam}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="mb-1">{match.homeTeam} vs {match.awayTeam}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Kicks off at {match.minute}</span>
                  </div>
                </div>
                {getStatusBadge(match.status)}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span><span className="text-blue-600">{match.attendees}</span> fans going</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStartMatchday(match.id)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
