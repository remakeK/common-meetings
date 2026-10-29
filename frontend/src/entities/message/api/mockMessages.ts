import type { Message } from '../model/types';

export const messages: Message[] = [
  {
    id: 1,
    eventId: 1,
    authorId: 1,
    text: 'Всем привет! Кто во сколько собирается?',
    createdAt: '2026-10-05T10:00:00',
  },
  {
    id: 2,
    eventId: 1,
    authorId: 2,
    text: 'Я планирую к 18:30 подойти',
    createdAt: '2026-10-05T10:05:00',
  },
  {
    id: 3,
    eventId: 1,
    authorId: 3,
    text: 'Тоже буду. Может, встретимся у входа?',
    createdAt: '2026-10-05T10:10:00',
  },
];