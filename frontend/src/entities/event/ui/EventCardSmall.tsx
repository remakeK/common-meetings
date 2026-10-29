import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Event } from '../model/types';
import { EventCard } from './EventCard';
import { JoinEventButton } from '../../../features/join-event/ui/JoinEventButton';

export function EventCardSmall({ event }: { event: Event }) {
  return (
    <EventCard
      event={event}
      actions={
        <>
          <JoinEventButton isJoined={false} onJoin={() => {}} onLeave={() => {}} />
          <Button
            size="small"
            variant="outlined"
            component={RouterLink}
            to={`/events/${event.id}`}
            sx={{ color: '#ffffffd7', borderColor: '#ffffff9c', borderRadius: 2 }}
          >
            Подробнее
          </Button>
        </>
      }
    />
  );
}