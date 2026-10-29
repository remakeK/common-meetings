import type { Message } from './types';

export function selectMessagesByEvent(
  messages: Message[],
  eventId: number,
): Message[] {
  return messages
    .filter((m) => m.eventId === eventId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}