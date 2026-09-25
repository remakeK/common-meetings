import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import type { Event } from "../types/Event";

function EventCardSmall({ event }: { event: Event }) {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                borderRadius: 4
            }}
        >
            <CardContent>
                <Typography variant="h5">
                    {event.name}
                </Typography>

                <Typography variant="body2" gutterBottom color="textSecondary">
                    {event.date}
                </Typography>

                <Typography variant="body2" gutterBottom color="textSecondary">
                    {event.location}
                </Typography>

                <Typography
                    variant="body1"
                    color="textSecondary"
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
                <Button 
                size="small"
                variant="contained"
                sx={{backgroundColor: "#2563EB", borderRadius: 2, "&:hover": {backgroundColor: "#1D4ED8", borderRadius: 2}}}>
                    Я приду
                </Button>
                <Button
                size="small" 
                variant="outlined"
                sx={{color: "#000000", borderColor: "#000000", borderRadius: 2}}>
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    );
}

export default EventCardSmall;