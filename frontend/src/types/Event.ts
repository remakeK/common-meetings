import type { User } from "../types/User" 

export interface Event{
    id: number;
    creator: User
    name: string;
    description: string;
    date: string;
    location: string;
    maxParticipants: number;
    participants: User[];
}
