import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EventCardJoined from "../components/EventCardJoined";
import EventCardOutdated from "../components/EventCardOutdated";
import { events } from "../data/mockData";

function MyEventsPage() {
    return (
        <Container>
            <Typography variant="h3" sx={{color: "white"}}>
                Мои события
            </Typography>

            <Grid container spacing={1}>
                {events.map(event => (
                    <Grid key={event.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <EventCardJoined event={event} />
                    </Grid>
                ))}
            </Grid>
            <hr />
            <Typography variant="h4" sx={{color: "white"}}>
                Архив
            </Typography>
                        <Grid container spacing={1}>
                {events.map(event => (
                    <Grid key={event.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <EventCardOutdated event={event} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default MyEventsPage;