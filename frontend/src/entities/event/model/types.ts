export interface Event {
  id: number;
  creatorId: number;
  name: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  participantIds: number[];
}