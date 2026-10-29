import type { User } from '../model/types';

export const users: User[] = [
  { id: 1, name: 'Дмитрий', email: 'dmitry@example.com' },
  { id: 2, name: 'Анна', email: 'anna@example.com' },
  { id: 3, name: 'Иван', email: 'ivan@example.com' },
  { id: 4, name: 'Максим', email: 'maxim@example.com' },
  { id: 5, name: 'Егор', email: 'egor@example.com' },
  { id: 6, name: 'Мария', email: 'maria@example.com' },
  { id: 7, name: 'Алексей', email: 'alexey@example.com' },
  { id: 8, name: 'Ольга', email: 'olga@example.com' },
  { id: 9, name: 'Сергей', email: 'sergey@example.com' },
  { id: 10, name: 'Елена', email: 'elena@example.com' },
];

export const usersById: Record<number, User> = Object.fromEntries(
  users.map((u) => [u.id, u]),
);