import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Event } from '../model/types';
import { EventCard } from './EventCard';
import { LeaveEventButton } from '../../../features/leave-event/ui/LeaveEventButton';
import { OpenChatButton } from '../../../features/open-event-chat/ui/OpenChatButton';

export function EventCardJoined({ event }: { event: Event }) {
  return (
    <EventCard
      event={event}
      actions={
        <>
          <LeaveEventButton />
          <OpenChatButton eventId={event.id} />
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