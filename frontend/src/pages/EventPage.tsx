import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { fetchEventById } from '../entities/event/api/fetchEvents';
import { usersById } from '../entities/user/api/mockUsers';
import { CURRENT_USER_ID } from '../entities/user/model/currentUser';
import { formatEventDate } from '../shared/lib/formatDate';
import { useAsync } from '../shared/lib/useAsync';
import { ErrorState } from '../shared/ui/ErrorState';
import { EmptyState } from '../shared/ui/EmptyState';
import { EventDetailsSkeleton } from '../shared/ui/PageLoader';
import { JoinEventButton } from '../features/join-event/ui/JoinEventButton';
import { OpenChatButton } from '../features/open-event-chat/ui/OpenChatButton';

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);

  const { data: event, loading, error } = useAsync(
    () => fetchEventById(eventId),
    [eventId],
  );

  const [joined, setJoined] = useState<boolean | null>(null);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <EventDetailsSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ErrorState message={`Не удалось загрузить событие: ${error}`} />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <EmptyState
          title="Событие не найдено"
          description="Возможно, оно было удалено или вы перешли по неверной ссылке."
        />
      </Container>
    );
  }

  const isJoined = joined ?? event.participantIds.includes(CURRENT_USER_ID);
  const participants = event.participantIds
    .map((uid) => usersById[uid])
    .filter(Boolean);
  const creator = usersById[event.creatorId];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h3">{event.name}</Typography>

            <Typography variant="body1" color="text.secondary">
              {formatEventDate(event.date)} · {event.location}
            </Typography>

            {creator && (
              <Typography variant="body2" color="text.secondary">
                Организатор: {creator.name}
              </Typography>
            )}

            <Divider />

            <Typography variant="h5">Описание</Typography>
            <Typography variant="body1" color="text.secondary">
              {event.description}
            </Typography>

            <Divider />

            <Typography variant="h5">Участники</Typography>
            <Typography variant="body1" color="text.secondary">
              {event.participantIds.length} / {event.maxParticipants}
            </Typography>

            <Stack spacing={1}>
              {participants.map((p) => (
                <Typography key={p.id}>{p.name}</Typography>
              ))}
            </Stack>
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <JoinEventButton
            isJoined={isJoined}
            onJoin={() => setJoined(true)}
            onLeave={() => setJoined(false)}
          />
          {isJoined && <OpenChatButton eventId={event.id} />}
        </CardActions>
      </Card>
    </Container>
  );
}