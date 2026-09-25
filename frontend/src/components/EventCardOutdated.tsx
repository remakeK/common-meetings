import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import type { Event } from "../types/Event";

function EventCardOutdated({ event }: { event: Event }) {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#beb0b0",
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
                justifyContent: "space-evenly"
                }}>
                <Button size="small" variant="contained"
                sx={{color:"2563EB",
                minWidth: 40,
                 borderColor: "#2563EB",
                  borderRadius: 2,
                   "&:hover": {backgroundColor: "#7aaff3"}}}>
                     💬 
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

export default EventCardOutdated;