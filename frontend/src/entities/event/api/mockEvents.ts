import type { Event } from '../model/types';

export const events: Event[] = [
  {
    id: 1,
    creatorId: 1,
    name: 'Концерт Bring Me The Horizon',
    description:
      'Идём вместе на концерт. Можно встретиться заранее и пойти на площадку вместе.',
    date: '2026-10-10T19:00:00',
    location: 'Unibet Arena',
    maxParticipants: 20,
    participantIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    creatorId: 2,
    name: 'Поход в кино',
    description:
      'Собираемся посмотреть новый фильм, а после можно обсудить его за чашкой кофе.',
    date: '2026-10-12T18:30:00',
    location: 'Apollo Kino',
    maxParticipants: 8,
    participantIds: [2, 5, 6],
  },
  {
    id: 3,
    creatorId: 3,
    name: 'Настольные игры',
    description:
      'Вечер настольных игр для всех желающих. Возьмём несколько разных игр.',
    date: '2026-10-15T17:00:00',
    location: 'Mängutuba',
    maxParticipants: 12,
    participantIds: [3, 4, 7, 8, 9, 10],
  },
  {
    id: 4,
    creatorId: 5,
    name: 'Прогулка по Старому городу',
    description:
      'Спокойно погуляем по Старому городу, пообщаемся и зайдём куда-нибудь перекусить.',
    date: '2026-10-18T14:00:00',
    location: 'Площадь Виру',
    maxParticipants: 10,
    participantIds: [5, 8],
  },
  {
    id: 5,
    creatorId: 4,
    name: 'Футбол во дворе',
    description: 'Собираем небольшую компанию для игры в футбол. Опыт не важен.',
    date: '2026-10-20T16:00:00',
    location: 'Спортивная площадка',
    maxParticipants: 10,
    participantIds: [1, 4, 7, 9, 10, 6, 3, 2, 5, 8],
  },
  {
    id: 6,
    creatorId: 6,
    name: 'Поход в музей',
    description:
      'Посетим музей современного искусства, а после обсудим понравившиеся экспонаты.',
    date: '2026-10-25T13:00:00',
    location: 'Kumu',
    maxParticipants: 15,
    participantIds: [6, 10],
  },
  {
  id: 7,
  creatorId: 2,
  name: 'Прошедший квартирник',
  description: 'Уютный вечер с музыкой. Уже прошёл, но оставил приятные воспоминания.',
  date: '2025-09-01T18:00:00',
  location: 'Дом культуры',
  maxParticipants: 15,
  participantIds: [1, 2],
},
];