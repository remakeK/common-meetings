import type { ReactNode } from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import type { Event } from '../model/types';
import { formatEventDate } from '../../../shared/lib/formatDate';

interface EventCardProps {
  event: Event;
  actions: ReactNode;
  muted?: boolean;
}

export function EventCard({ event, actions, muted = false }: EventCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: muted ? '#5832ff48' : 'background.paper',
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Typography variant="h5">{event.name}</Typography>

        <Typography variant="body2" gutterBottom color="text.secondary">
          {formatEventDate(event.date)}
        </Typography>

        <Typography variant="body2" gutterBottom color="text.secondary">
          {event.location}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.description}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {event.participantIds.length} / {event.maxParticipants}
        </Typography>
      </CardContent>

      <CardActions sx={{ marginTop: 'auto', gap: 1 }}>{actions}</CardActions>
    </Card>
  );
}