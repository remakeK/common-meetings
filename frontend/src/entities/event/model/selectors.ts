import type { Event } from './types';
import { isEventPast } from '../../../shared/lib/dateUtils';

export function selectUserEvents(
  events: Event[],
  userId: number,
): Event[] {
  return events.filter((e) => e.participantIds.includes(userId));
}

export function selectUpcoming(events: Event[]): Event[] {
  return events.filter((e) => !isEventPast(e.date));
}

export function selectPast(events: Event[]): Event[] {
  return events.filter((e) => isEventPast(e.date));
}