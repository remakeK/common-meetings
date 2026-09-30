import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { events } from "../data/mockData";
import EventCardSmall from "../components/EventCards/EventCardSmall";
import EventCardJoined from "../components/EventCards/EventCardJoined";

function HomePage(){
    const nearestEvents = events.slice(0, 3);
    const myEvents = events.slice(3,6);

    return (
        <Container>
            <Typography variant="h4" sx={{color: "white", mt: 2, mb: 2}}>
                Ближайшие события
            </Typography>

            <Grid container spacing={3}>
                {nearestEvents.map(event => (
                    <Grid
                    key={event.id}
                    size={{ xs: 12, sm: 6, md: 4}}>
                        <EventCardSmall event={event}/>
                        </Grid>))}
            </Grid>

            <Typography variant="h4" sx={{color: "white", mt: 2, mb: 2}}>
                Мои события
            </Typography>
            
            <Grid container spacing={3}>
                {myEvents.map(event =>(
                    <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4}}>
                        <EventCardJoined event={event}/>
                        </Grid>
                ))}
            </Grid>
        </Container>
    );
}
export default HomePage;