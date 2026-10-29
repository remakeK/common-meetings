import { Container, Typography, Grid } from '@mui/material';

import { EventCardJoined } from '../entities/event/ui/EventCardJoined';
import { EventCardOutdated } from '../entities/event/ui/EventCardOutdated';
import { fetchEvents } from '../entities/event/api/fetchEvents';
import {selectPast,selectUpcoming,selectUserEvents,} from "../entities/event/model/selectors";
import { CURRENT_USER_ID } from '../entities/user/model/currentUser';
import { useAsync } from '../shared/lib/useAsync';
import { EventsGridSkeleton } from '../shared/ui/PageLoader';
import { ErrorState } from '../shared/ui/ErrorState';
import { EmptyState } from '../shared/ui/EmptyState';

export function MyEventsPage() {
  const { data: events, loading, error } = useAsync(fetchEvents, []);

  const myEvents = events ? selectUserEvents(events, CURRENT_USER_ID) : [];
  const upcoming = selectUpcoming(myEvents);
  const past = selectPast(myEvents);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Мои события
      </Typography>

      {loading && <EventsGridSkeleton />}
      {error && <ErrorState message={`Не удалось загрузить события: ${error}`} />}

      {!loading && !error && (
        <>
          {upcoming.length === 0 ? (
            <EmptyState
              title="Вы пока никуда не записаны("
              description='Это можно исправить, просто нажмите "я приду" на интересующее событие!'
            />
          ) : (
            <Grid container spacing={2}>
              {upcoming.map((event) => (
                <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <EventCardJoined event={event} />
                </Grid>
              ))}
            </Grid>
          )}

          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
            Архив
          </Typography>

          {past.length === 0 ? (
            <EmptyState title="Архив пуст" />
          ) : (
            <Grid container spacing={2}>
              {past.map((event) => (
                <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <EventCardOutdated event={event} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}