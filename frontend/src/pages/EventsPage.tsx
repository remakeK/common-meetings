import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EventCardSmall from "../components/EventCards/EventCardSmall";
import { events } from "../data/mockData";

function EventsPage() {
    return (
        <Container>
            <Typography variant="h3" sx={{color: "white"}}>
                Все события
            </Typography>

            <Grid container spacing={1}>
                {events.map(event => (
                    <Grid key={event.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <EventCardSmall event={event} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default EventsPage;