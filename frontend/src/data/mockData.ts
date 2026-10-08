import type { Event } from "../types/Event";

export const events: Event[] = [
    {
        id: 1,
        name: "Концерт Bring Me The Horizon",
        description: "Идём вместе на концерт. Можно встретиться заранее и пойти на площадку вместе.",
        date: "2026-10-10 19:00",
        location: "Unibet Arena",
        maxParticipants: 20,
        participants: [
            { id: 1, name: "Дмитрий" },
            { id: 2, name: "Анна" },
            { id: 3, name: "Иван" },
            { id: 4, name: "Максим" }
        ],
        creator: {
            id: 1,
            name: "Дмитрий"
        }
    },
    {
        id: 2,
        name: "Поход в кино",
        description: "Собираемся посмотреть новый фильм, а после можно обсудить его за чашкой кофе.",
        date: "2026-10-12 18:30",
        location: "Apollo Kino",
        maxParticipants: 8,
        participants: [
            { id: 2, name: "Анна" },
            { id: 5, name: "Егор" },
            { id: 6, name: "Мария" }
        ],
        creator: {
            id: 2,
            name: "Анна"
        }
    },
    {
        id: 3,
        name: "Настольные игры",
        description: "Вечер настольных игр для всех желающих. Возьмём несколько разных игр.",
        date: "2026-10-15 17:00",
        location: "Mängutuba",
        maxParticipants: 12,
        participants: [
            { id: 3, name: "Иван" },
            { id: 4, name: "Максим" },
            { id: 7, name: "Алексей" },
            { id: 8, name: "Ольга" },
            { id: 9, name: "Сергей" },
            { id: 10, name: "Елена" }
        ],
        creator: {
            id: 3,
            name: "Иван"
        }
    },
    {
        id: 4,
        name: "Прогулка по Старому городу",
        description: "Спокойно погуляем по Старому городу, пообщаемся и зайдём куда-нибудь перекусить.",
        date: "2026-10-18 14:00",
        location: "Площадь Виру",
        maxParticipants: 10,
        participants: [
            { id: 5, name: "Егор" },
            { id: 8, name: "Ольга" }
        ],
        creator: {
            id: 5,
            name: "Егор"
        }
    },
    {
        id: 5,
        name: "Футбол во дворе",
        description: "Собираем небольшую компанию для игры в футбол. Опыт не важен.",
        date: "2026-10-20 16:00",
        location: "Спортивная площадка",
        maxParticipants: 10,
        participants: [
            { id: 1, name: "Дмитрий" },
            { id: 4, name: "Максим" },
            { id: 7, name: "Алексей" },
            { id: 9, name: "Сергей" },
            { id: 10, name: "Елена" },
            { id: 6, name: "Мария" },
            { id: 3, name: "Иван" },
            { id: 2, name: "Анна" },
            { id: 5, name: "Егор" },
            { id: 8, name: "Ольга" }
        ],
        creator: {
            id: 4,
            name: "Максим"
        }
    },
    {
        id: 6,
        name: "Поход в музей",
        description: "Посетим музей современного искусства, а после обсудим понравившиеся экспонаты.",
        date: "2026-10-25 13:00",
        location: "Kumu",
        maxParticipants: 15,
        participants: [
            { id: 6, name: "Мария" },
            { id: 10, name: "Елена" }
        ],
        creator: {
            id: 6,
            name: "Мария"
        }
    }
];