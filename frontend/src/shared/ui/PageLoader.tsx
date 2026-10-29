import { Card, CardContent, Grid, Skeleton } from '@mui/material';

export function EventsGridSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Skeleton variant="text" width="70%" height={36} />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function EventDetailsSkeleton() {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={56} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={1} sx={{ my: 2 }} />
        <Skeleton variant="text" width="20%" height={32} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={1} sx={{ my: 2 }} />
        <Skeleton variant="text" width="20%" height={32} />
        <Skeleton variant="text" width="15%" />
        <Skeleton variant="text" width="25%" />
      </CardContent>
    </Card>
  );
}