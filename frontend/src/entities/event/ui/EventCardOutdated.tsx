import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Event } from '../model/types';
import { EventCard } from './EventCard';
import { OpenChatButton } from '../../../features/open-event-chat/ui/OpenChatButton';

export function EventCardOutdated({ event }: { event: Event }) {
  return (
    <EventCard
      event={event}
      muted
      actions={
        <>
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