import type { Message } from '../model/types';
import { messages } from './mockMessages';

export function fetchMessages(eventId: number): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(messages.filter((m) => m.eventId === eventId)), 400);
  });
}