import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import type { Event } from "../types/Event";

function EventCard({ event }: { event: Event }) {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <CardContent>
                <Typography variant="h5">
                    {event.name}
                </Typography>

                <Typography variant="body2" gutterBottom>
                    {event.date}
                </Typography>

                <Typography variant="body2" gutterBottom>
                    {event.location}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {event.description}
                </Typography>

                <Typography variant="body1" gutterBottom>
                    {event.participants.length} / {event.maxParticipants}
                </Typography>
            </CardContent>

            <CardActions sx={{ 
                marginTop: "auto",
                justifyContent: "space-between"
                }}>
                <Button variant="contained">
                    Вступить
                </Button>
                <Button variant="contained">
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    );
}

export default EventCard;