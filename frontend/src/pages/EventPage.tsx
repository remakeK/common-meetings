import {Button,Card,CardActions,CardContent,Container,Divider,Stack,Typography} from "@mui/material";

import { events } from "../data/mockData";

function EventPage() {
    const event = events[0];

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card
                sx={{backgroundColor: "#ddeffd", borderRadius: 4}}
            >
                <CardContent>
                    <Stack spacing={3}>

                        <Typography variant="h3" sx={{ color: "#1E293B" }}>
                            {event.name}
                        </Typography>

                        <Typography variant="body1" sx={{ color: "#64748B" }}>
                            {event.date} · {event.location}
                        </Typography>

                    <Divider />


                        <Typography
                            variant="h5"
                            sx={{ color: "#1E293B" }}
                        >
                            Описание
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ color: "#475569" }}
                        >
                            {event.description}
                        </Typography>


                    <Divider />

                        <Typography variant="h5" sx={{ color: "#1E293B" }}>
                            Участники
                        </Typography>
                                                
                        <Typography variant="body1" sx={{ color: "#64748B" }}>
                            {event.participants.length} / {event.maxParticipants}
                        </Typography>
                        
                        <Stack spacing={1}>
                            
                            {event.participants.map(participant => (
                                <Typography key={participant.id} sx={{ color: "#1E293B" }}>
                                    {participant.name}
                                </Typography>
                            ))}
                        </Stack>


                    </Stack>
                    <CardActions sx={{ justifyContent: "space-between"}}>
                        <Button variant="contained" size="large" sx={{borderRadius: 2}}>
                        Вступить
                        </Button>

                    <Button size="large" variant="contained" sx={{borderRadius: 2}}>
                     Открыть чат 💬 
                    </Button>
                        </CardActions>
                </CardContent>
            </Card>
        </Container>
    );
}

export default EventPage;