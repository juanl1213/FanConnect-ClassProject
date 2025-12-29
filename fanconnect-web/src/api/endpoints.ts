import api from './http';
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

export const listEvents = async () => (await api.get<Event[]>('/events')).data;

export const getEvent = async (id: string) => (await api.get<Event>(`/events/${id}`)).data;

export const listAttendees = async () => (await api.get<Attendee[]>('/attendees')).data;

export const listChats = async () =>
  (
    await api.get<{
      activeChats: ChatPreview[];
      pastChats: ChatPreview[];
    }>('/chats')
  ).data;

export const listChatMessages = async (chatId: string) =>
  (await api.get<ChatMessage[]>(`/chats/${chatId}/messages`)).data;

export const listLiveMatches = async () => (await api.get<LiveMatch[]>('/live')).data;

export const listUpcomingMatches = async () => (await api.get<LiveMatch[]>('/live/upcoming')).data;

export const listMatchdayPosts = async (eventId: string) =>
  (await api.get<MatchdayPost[]>(`/events/${eventId}/posts`)).data;

export const listProfile = async () =>
  (
    await api.get<{
      favoriteTeam: { name: string; league: string };
      upcomingEvents: ProfileEvent[];
      pastEvents: ProfileEvent[];
      goalBuddies: GoalBuddy[];
    }>('/profile/me')
  ).data;

