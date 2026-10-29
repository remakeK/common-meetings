import type { Event } from '../model/types';
import { events } from './mockEvents';

export function fetchEvents(): Promise<Event[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(events), 500);
  });
}

export function fetchEventById(id: number): Promise<Event | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(events.find((e) => e.id === id)), 400);
  });
}