import { Container, Typography, Grid } from '@mui/material';

import { EventCardSmall } from '../entities/event/ui/EventCardSmall';
import { EventCardJoined } from '../entities/event/ui/EventCardJoined';
import { fetchEvents } from '../entities/event/api/fetchEvents';
import { useAsync } from '../shared/lib/useAsync';
import { EventsGridSkeleton } from '../shared/ui/PageLoader';
import { ErrorState } from '../shared/ui/ErrorState';

export function HomePage() {
  const { data: events, loading, error } = useAsync(fetchEvents, []);

  const nearestEvents = events?.slice(0, 3) ?? [];
  const myEvents = events?.slice(3, 6) ?? [];

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ближайшие события
      </Typography>

      {loading && <EventsGridSkeleton />}
      {error && <ErrorState message={`Не удалось загрузить события: ${error}`} />}

      {!loading && !error && (
        <>
          <Grid container spacing={2}>
            {nearestEvents.map((event) => (
              <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <EventCardSmall event={event} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
            Мои события
          </Typography>

          <Grid container spacing={2}>
            {myEvents.map((event) => (
              <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <EventCardJoined event={event} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}