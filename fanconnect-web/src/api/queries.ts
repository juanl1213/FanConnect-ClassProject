import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  listAttendees,
  listChats,
  listChatMessages,
  getEvent,
  listEvents,
  listLiveMatches,
  listMatchdayPosts,
  listProfile,
  listUpcomingMatches
} from './endpoints';
import type {
  Attendee,
  ChatMessage,
  ChatPreview,
  Event,
  GoalBuddy,
  LiveMatch,
  MatchdayPost,
  ProfileEvent
} from '../types';

const keys = {
  events: ['events'] as const,
  event: (id: string) => ['events', id] as const,
  attendees: ['attendees'] as const,
  chats: ['chats'] as const,
  chatMessages: (chatId: string) => ['chats', chatId, 'messages'] as const,
  live: ['live'] as const,
  upcoming: ['upcoming'] as const,
  matchdayPosts: (eventId: string) => ['matchday', eventId, 'posts'] as const,
  profile: ['profile'] as const
};

export const useEventsQuery = (): UseQueryResult<Event[]> =>
  useQuery({
    queryKey: keys.events,
    queryFn: listEvents
  });

export const useEventQuery = (id?: string): UseQueryResult<Event | undefined> =>
  useQuery({
    queryKey: id ? keys.event(id) : keys.event('none'),
    queryFn: () => (id ? getEvent(id) : Promise.resolve(undefined)),
    enabled: Boolean(id)
  });

export const useAttendeesQuery = (): UseQueryResult<Attendee[]> =>
  useQuery({
    queryKey: keys.attendees,
    queryFn: listAttendees
  });

export const useChatsQuery = (): UseQueryResult<{ activeChats: ChatPreview[]; pastChats: ChatPreview[] }> =>
  useQuery({
    queryKey: keys.chats,
    queryFn: listChats
  });

export const useChatMessagesQuery = (chatId: string): UseQueryResult<ChatMessage[]> =>
  useQuery({
    queryKey: keys.chatMessages(chatId),
    queryFn: () => listChatMessages(chatId)
  });

export const useLiveMatchesQuery = (): UseQueryResult<LiveMatch[]> =>
  useQuery({
    queryKey: keys.live,
    queryFn: listLiveMatches
  });

export const useUpcomingMatchesQuery = (): UseQueryResult<LiveMatch[]> =>
  useQuery({
    queryKey: keys.upcoming,
    queryFn: listUpcomingMatches
  });

export const useMatchdayPostsQuery = (eventId: string): UseQueryResult<MatchdayPost[]> =>
  useQuery({
    queryKey: keys.matchdayPosts(eventId),
    queryFn: () => listMatchdayPosts(eventId)
  });

export const useProfileQuery = (): UseQueryResult<{
  favoriteTeam: { name: string; league: string };
  upcomingEvents: ProfileEvent[];
  pastEvents: ProfileEvent[];
  goalBuddies: GoalBuddy[];
}> =>
  useQuery({
    queryKey: keys.profile,
    queryFn: listProfile
  });

