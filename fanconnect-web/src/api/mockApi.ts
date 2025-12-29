import {
  attendees,
  events,
  activeChats,
  pastChats,
  chatMessages,
  matchdayPosts,
  upcomingProfileEvents,
  pastProfileEvents,
  goalBuddies,
  liveMatches,
  upcomingMatches
} from '../data';

const withLatency = <T>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const mockApi = {
  listEvents: () => withLatency(events),
  getEvent: (id: string) => withLatency(events.find((e) => e.id === id)),
  listAttendees: () => withLatency(attendees),
  listChats: () => withLatency({ activeChats, pastChats }),
  listChatMessages: () => withLatency(chatMessages),
  listLiveMatches: () => withLatency(liveMatches),
  listUpcomingMatches: () => withLatency(upcomingMatches),
  listMatchdayPosts: () => withLatency(matchdayPosts),
  listProfile: () =>
    withLatency({
      favoriteTeam: {
        name: 'Manchester United',
        league: 'Premier League'
      },
      upcomingEvents: upcomingProfileEvents,
      pastEvents: pastProfileEvents,
      goalBuddies
    })
};

