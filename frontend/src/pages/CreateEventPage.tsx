import { Button, Container, TextField, Typography, Stack } from "@mui/material";
import { useState } from "react";

function CreateEventPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");

    const handleSubmit = (event: React.FormEvent) => {event.preventDefault();
        const newEvent = {
            id: 7,
            name: name,
            description: description,
            date: date,
            location: location,
            maxParticipants: Number(maxParticipants),
            participants: [{ id: 4, name: "Максим" }],
            creator: {
                id: 4,
                name: "Максим"
            }
        };
        console.log(newEvent);

        setName("");
        setDescription("");
        setDate("");
        setLocation("");
        setMaxParticipants("");
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{color: "white", mt: 2, mb: 2}}>
                Создание своего события
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        value={name}
                        label="Название события"
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                        sx={{backgroundColor: "#FFFFFF"}}
                    />

                    <TextField
                        label="Описание"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        multiline
                        rows={2}
                        fullWidth
                        sx={{backgroundColor: "#FFFFFF"}}
                    />

                    <TextField
                        label="Дата"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        type="date"
                        slotProps={{
                            inputLabel: {
                                shrink: true
                            }
                        }}
                        fullWidth
                        sx={{backgroundColor: "#FFFFFF"}}
                    />

                    <TextField
                        label="Место проведения"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        fullWidth
                        sx={{backgroundColor: "#FFFFFF"}}
                    />

                    <TextField
                        label="Максимальное количество участников"
                        value={maxParticipants}
                        onChange={(event) => setMaxParticipants(event.target.value)}
                        type="number"
                        fullWidth
                        sx={{backgroundColor: "#FFFFFF"}}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                    >
                        Создать событие
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default CreateEventPage;
