import { Attendee, ChatMessage, ChatPreview, Event, GoalBuddy, LiveMatch, MatchdayPost, ProfileEvent } from './types';

export const events: Event[] = [
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
    imageUrl:
      'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    imageUrl:
      'https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    imageUrl:
      'https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    imageUrl:
      'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    imageUrl:
      'https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    distance: '1.2 km'
  }
];

export const attendees: Attendee[] = [
  { id: '1', name: 'Sarah M.', avatar: 'SM', favoriteTeam: 'Manchester United', vibe: 'Cheer squad', ageRange: '25-30', verified: true },
  { id: '2', name: 'James K.', avatar: 'JK', favoriteTeam: 'Liverpool', vibe: 'Chill', ageRange: '30-35', verified: true },
  { id: '3', name: 'Emma R.', avatar: 'ER', favoriteTeam: 'Manchester United', vibe: 'First-timer', ageRange: '20-25', verified: false },
  { id: '4', name: 'David L.', avatar: 'DL', favoriteTeam: 'Neutral', vibe: 'Chill', ageRange: '28-32', verified: true },
  { id: '5', name: 'Mia T.', avatar: 'MT', favoriteTeam: 'Manchester United', vibe: 'Cheer squad', ageRange: '22-27', verified: true }
];

export const liveMatches: LiveMatch[] = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: "67'",
    league: 'Premier League',
    attendees: 47,
    imageUrl:
      'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
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
    imageUrl:
      'https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  }
];

export const upcomingMatches: LiveMatch[] = [
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
    imageUrl:
      'https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
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
    imageUrl:
      'https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  }
];

export const activeChats: ChatPreview[] = [
  {
    id: '1',
    eventName: 'Man Utd vs Liverpool',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    lastMessage: 'Emma: This is my first time at Old Trafford! So excited 🎉',
    lastMessageTime: '2m ago',
    unreadCount: 3,
    members: 47,
    isActive: true
  },
  {
    id: '2',
    eventName: 'Real Madrid vs Bayern',
    homeTeam: 'Real Madrid',
    awayTeam: 'Bayern Munich',
    lastMessage: 'Alex: See you all at the bar! 🍻',
    lastMessageTime: '15m ago',
    unreadCount: 1,
    members: 23,
    isActive: true
  }
];

export const pastChats: ChatPreview[] = [
  {
    id: '3',
    eventName: 'Chelsea vs Arsenal',
    homeTeam: 'Chelsea',
    awayTeam: 'Arsenal',
    lastMessage: 'Sarah: Thanks everyone, great match!',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    members: 31,
    isActive: false
  },
  {
    id: '4',
    eventName: 'Barcelona vs Real Madrid',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    lastMessage: 'Mike: What a game! 🔥',
    lastMessageTime: '5 days ago',
    unreadCount: 0,
    members: 19,
    isActive: false
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'system',
    senderName: 'FanConnect',
    senderAvatar: '⚽',
    message:
      'Welcome to the Manchester United vs Liverpool match chat! Use these icebreakers to get started:',
    timestamp: '14:20',
    isIcebreaker: false
  },
  {
    id: '2',
    senderId: 'system',
    senderName: 'Icebreaker',
    senderAvatar: '💬',
    message: "Where are you all sitting? Let's try to meet up!",
    timestamp: '14:21',
    isIcebreaker: true
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Sarah M.',
    senderAvatar: 'SM',
    message: "I'm in the Stretford End! Section 127. Anyone nearby?",
    timestamp: '14:23',
    isIcebreaker: false
  },
  {
    id: '4',
    senderId: '2',
    senderName: 'James K.',
    senderAvatar: 'JK',
    message: "I'm in 125! Right next to you Sarah 👋",
    timestamp: '14:24',
    isIcebreaker: false
  },
  {
    id: '5',
    senderId: '5',
    senderName: 'Mia T.',
    senderAvatar: 'MT',
    message:
      "Anyone planning to grab food before the match? There's a great pub nearby",
    timestamp: '14:28',
    isIcebreaker: false
  },
  {
    id: '6',
    senderId: '4',
    senderName: 'David L.',
    senderAvatar: 'DL',
    message: "I'm down! What time and where?",
    timestamp: '14:30',
    isIcebreaker: false
  },
  {
    id: '7',
    senderId: '3',
    senderName: 'Emma R.',
    senderAvatar: 'ER',
    message: 'This is my first time at Old Trafford! So excited 🎉',
    timestamp: '14:32',
    isIcebreaker: false
  }
];

export const matchdayPosts: MatchdayPost[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah M.',
    userAvatar: 'SM',
    content: 'GOALLLLLL! ⚽🔴 What an opener from Rashford!',
    image: null,
    timestamp: '2 min ago',
    likes: 23,
    comments: 5,
    isLiked: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'James K.',
    userAvatar: 'JK',
    content: 'The atmosphere here is INSANE! 🔥',
    image:
      'https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    timestamp: '5 min ago',
    likes: 41,
    comments: 8,
    isLiked: false
  },
  {
    id: '3',
    userId: '5',
    userName: 'Mia T.',
    userAvatar: 'MT',
    content: 'Pre-match meetup was amazing! Love this community 💙',
    image: null,
    timestamp: '12 min ago',
    likes: 18,
    comments: 3,
    isLiked: true
  },
  {
    id: '4',
    userId: '3',
    userName: 'Emma R.',
    userAvatar: 'ER',
    content: 'First time at Old Trafford and it did not disappoint! Thanks everyone for the warm welcome 🙏',
    image: null,
    timestamp: '18 min ago',
    likes: 34,
    comments: 12,
    isLiked: true
  }
];

export const upcomingProfileEvents: ProfileEvent[] = [
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

export const pastProfileEvents: ProfileEvent[] = [
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

export const goalBuddies: GoalBuddy[] = [
  { id: '1', name: 'Sarah M.', avatar: 'SM', eventsMet: 3 },
  { id: '2', name: 'James K.', avatar: 'JK', eventsMet: 2 },
  { id: '3', name: 'Emma R.', avatar: 'ER', eventsMet: 1 },
  { id: '4', name: 'David L.', avatar: 'DL', eventsMet: 2 },
  { id: '5', name: 'Mia T.', avatar: 'MT', eventsMet: 1 }
];

