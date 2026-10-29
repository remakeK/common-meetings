import { Container, Typography, Grid } from '@mui/material';

import { EventCardSmall } from '../entities/event/ui/EventCardSmall';
import { fetchEvents } from '../entities/event/api/fetchEvents';
import { useAsync } from '../shared/lib/useAsync';
import { EventsGridSkeleton } from '../shared/ui/PageLoader';
import { ErrorState } from '../shared/ui/ErrorState';
import { EmptyState } from '../shared/ui/EmptyState';

export function EventsPage() {
  const { data: events, loading, error } = useAsync(fetchEvents, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Все события
      </Typography>

      {loading && <EventsGridSkeleton />}

      {error && <ErrorState message={`Не удалось загрузить события: ${error}`} />}

      {!loading && !error && events && events.length === 0 && (
        <EmptyState
          title="Пока нет событий"
          description="Но вы можете это исправить! (+создать событие)"
        />
      )}

      {!loading && !error && events && events.length > 0 && (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <EventCardSmall event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}