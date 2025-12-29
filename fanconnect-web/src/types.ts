export type VenueType = 'stadium' | 'bar' | 'screening';

export interface Event {
  id: string;
  title: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  venue: string;
  venueType: VenueType;
  location: string;
  attendees: number;
  imageUrl: string;
  distance: string;
}

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
  favoriteTeam: string;
  vibe: 'Chill' | 'Cheer squad' | 'First-timer';
  ageRange: string;
  verified: boolean;
}

export type MatchStatus = 'live' | 'upcoming' | 'halftime';

export interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute?: string;
  league: string;
  attendees: number;
  imageUrl: string;
}

export interface ChatPreview {
  id: string;
  eventName: string;
  homeTeam: string;
  awayTeam: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  members: number;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isIcebreaker: boolean;
}

export interface MatchdayPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface ProfileEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  attendees?: number;
  buddiesMet?: number;
}

export interface GoalBuddy {
  id: string;
  name: string;
  avatar: string;
  eventsMet: number;
}

