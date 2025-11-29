import { ArrowLeft, MapPin, Calendar, Users, MessageSquare, Shield, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Attendee {
  id: string;
  name: string;
  avatar: string;
  favoriteTeam: string;
  vibe: 'Chill' | 'Cheer squad' | 'First-timer';
  ageRange: string;
  verified: boolean;
}

const mockAttendees: Attendee[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: 'SM',
    favoriteTeam: 'Manchester United',
    vibe: 'Cheer squad',
    ageRange: '25-30',
    verified: true
  },
  {
    id: '2',
    name: 'James K.',
    avatar: 'JK',
    favoriteTeam: 'Liverpool',
    vibe: 'Chill',
    ageRange: '30-35',
    verified: true
  },
  {
    id: '3',
    name: 'Emma R.',
    avatar: 'ER',
    favoriteTeam: 'Manchester United',
    vibe: 'First-timer',
    ageRange: '20-25',
    verified: false
  },
  {
    id: '4',
    name: 'David L.',
    avatar: 'DL',
    favoriteTeam: 'Neutral',
    vibe: 'Chill',
    ageRange: '28-32',
    verified: true
  },
  {
    id: '5',
    name: 'Mia T.',
    avatar: 'MT',
    favoriteTeam: 'Manchester United',
    vibe: 'Cheer squad',
    ageRange: '22-27',
    verified: true
  }
];

interface EventDetailProps {
  eventId: string;
  onBack: () => void;
  onJoinChat: (chatId: string) => void;
  onStartMatchday: (eventId: string) => void;
}

export function EventDetail({ eventId, onBack, onJoinChat, onStartMatchday }: EventDetailProps) {
  const event = {
    id: eventId,
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
    distance: '2.3 km',
    description: 'The biggest rivalry in English football! Join fellow fans for this epic showdown.'
  };

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case 'Cheer squad': return 'bg-orange-100 text-orange-700';
      case 'Chill': return 'bg-blue-100 text-blue-700';
      case 'First-timer': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 p-4 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Events</span>
      </button>

      {/* Event Header */}
      <div className="relative h-64">
        <ImageWithFallback
          src={event.imageUrl}
          alt={`${event.homeTeam} vs ${event.awayTeam}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Badge className="mb-3 bg-white text-gray-900">{event.league}</Badge>
            <h2 className="text-3xl mb-2">{event.homeTeam} vs {event.awayTeam}</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.date} • {event.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Venue Info */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">{event.venue}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-500 mt-1">{event.distance} away</p>
            </div>
            <Badge variant="secondary">
              🏟️ Stadium
            </Badge>
          </div>
        </Card>

        {/* About */}
        <div>
          <h3 className="mb-3">About This Match</h3>
          <p className="text-gray-600">{event.description}</p>
        </div>

        {/* Safety Notice */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm mb-1">Safety First</h4>
              <p className="text-xs text-gray-600">
                All users are verified. Report any suspicious behavior. Meet in public places.
              </p>
            </div>
          </div>
        </Card>

        {/* Find Companions Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="mb-1">Find Companions</h3>
              <p className="text-sm text-gray-600">
                <span className="text-blue-600">{event.attendees}</span> fans are going
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {mockAttendees.map((attendee) => (
              <Card key={attendee.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {attendee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{attendee.name}</h4>
                      {attendee.verified && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {attendee.favoriteTeam} • {attendee.ageRange}
                    </p>
                    
                    <Badge className={`text-xs ${getVibeColor(attendee.vibe)}`}>
                      {attendee.vibe}
                    </Badge>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    Message
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button className="w-full mt-4" variant="outline">
            View All {event.attendees} Attendees
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => onJoinChat(eventId)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Join Group Chat
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => onStartMatchday(eventId)}
            >
              🔴 Start Matchday Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
