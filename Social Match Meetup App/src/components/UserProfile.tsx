import { ArrowLeft, MapPin, Calendar, Users, Star, Settings, Shield, Heart, Trophy } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface UserProfileProps {
  onBack: () => void;
}

const upcomingEvents = [
  {
    id: '1',
    title: 'Man Utd vs Liverpool',
    date: 'Nov 9, 2024',
    venue: 'Old Trafford',
    attendees: 47
  },
  {
    id: '2',
    title: 'Real Madrid vs Bayern',
    date: 'Nov 6, 2024',
    venue: 'The Red Lion Sports Bar',
    attendees: 23
  }
];

const pastEvents = [
  {
    id: '1',
    title: 'Chelsea vs Arsenal',
    date: 'Oct 28, 2024',
    venue: 'Stamford Bridge',
    buddiesMet: 5
  },
  {
    id: '2',
    title: 'Barcelona vs Real Madrid',
    date: 'Oct 21, 2024',
    venue: 'Sports Hub Bar',
    buddiesMet: 3
  },
  {
    id: '3',
    title: 'PSG vs Marseille',
    date: 'Oct 15, 2024',
    venue: 'Community Screening',
    buddiesMet: 7
  }
];

const goalBuddies = [
  { id: '1', name: 'Sarah M.', avatar: 'SM', eventsMet: 3 },
  { id: '2', name: 'James K.', avatar: 'JK', eventsMet: 2 },
  { id: '3', name: 'Emma R.', avatar: 'ER', eventsMet: 1 },
  { id: '4', name: 'David L.', avatar: 'DL', eventsMet: 2 },
  { id: '5', name: 'Mia T.', avatar: 'MT', eventsMet: 1 }
];

export function UserProfile({ onBack }: UserProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarFallback className="bg-white text-blue-600 text-2xl">
              YU
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl mb-1">Your Name</h2>
          <p className="text-blue-100 text-sm mb-4">@yourname</p>
          
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-4 h-4 text-green-300" />
            <span className="text-sm text-green-300">Verified Account</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl mb-1">12</div>
              <div className="text-xs text-blue-100">Events Attended</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl mb-1">28</div>
              <div className="text-xs text-blue-100">GoalBuddies</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl mb-1">4.8</div>
              <div className="text-xs text-blue-100">Rating ⭐</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-4">
        {/* Favorite Team */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3>Favorite Team</h3>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
              MU
            </div>
            <div>
              <h4>Manchester United</h4>
              <p className="text-sm text-gray-600">Premier League</p>
            </div>
          </div>
        </Card>

        {/* Vibe */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3>My Vibe</h3>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-700">Cheer squad</Badge>
            <Badge className="bg-blue-100 text-blue-700">Social</Badge>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="buddies">Buddies</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-3 mt-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">Going</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm pt-3 border-t border-gray-100">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>{event.attendees} fans going</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-3 mt-4">
            {pastEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">Attended</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Met {event.buddiesMet} buddies</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Star className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* GoalBuddies */}
          <TabsContent value="buddies" className="space-y-3 mt-4">
            <div className="text-center mb-4">
              <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <h3 className="mb-1">Your GoalBuddies</h3>
              <p className="text-sm text-gray-600">Fans you've connected with at events</p>
            </div>

            {goalBuddies.map((buddy) => (
              <Card key={buddy.id} className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {buddy.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4>{buddy.name}</h4>
                    <p className="text-sm text-gray-600">
                      Met at {buddy.eventsMet} {buddy.eventsMet === 1 ? 'event' : 'events'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Achievements */}
        <Card className="p-4">
          <h3 className="mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-1">🏆</div>
              <p className="text-xs">First Match</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-1">🤝</div>
              <p className="text-xs">Social Butterfly</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-xs">Top Rated</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
