import { Container, Paper, Stack, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import type { Message } from "../types/Message";

function EventChatPage(){
    const [messages, setMessages] = useState<Message[]>([
    {
        id: 1,
        name: "Андрей",
        text: "Кто-нибудь ещё идёт на концерт?"
    },
    {
        id: 2,
        name: "Дмитрий",
        text: "Да, я иду!"
    },
    {
        id: 3,
        name: "Максим",
        text: "Во сколько встреча?"
    }
    ]);

    const [text, setText] = useState("");

    const handleSend = () => {
        if(text.trim() === ""){
            return;
        }

        const newMessage: Message = {
            id: messages.length + 1,
            name: "Максим",
            text: text
        };

        setMessages([...messages, newMessage])
        
        setText("");
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{color: "white", mt: 3, mb: 3}}>
                Чат
            </Typography>
            <Paper sx={{ p: 1 , backgroundColor: "#d3f5fc", overflowWrap: "anywhere" }} >
                <Stack spacing={2} sx={{backgroundColor: "#d3f5fc"}} >
                    {messages.map(message => (
                        <Stack key={message.id} sx={{
                            alignItems: message.name === "Максим" ? "flex-end" : "flex-start"}}>
                                <Paper sx={{ p:2 ,
                            borderRadius: 5}}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {message.name}
                                    </Typography>
                                    <Typography>
                                        {message.text}
                                    </Typography>
                                </Paper>
                            </Stack>
                    ))}
                <Stack direction="row" spacing={2}>
                    <TextField 
                    label="Сообщение" 
                    value={text}
                    onChange={(event) => setText(event.target.value)} 
                    fullWidth
                    sx={{ backgroundColor: "#ffffff" }}/>

                    <Button variant="contained" onClick={handleSend} sx={{flexShrink: 0}}>
                        Отправить
                    </Button>
                </Stack>
                </Stack>
            </Paper>

        </Container>
    );
}
export default EventChatPage;