import { Button, Container, TextField, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {event.preventDefault();
        setName("");
        setPassword("");
    }

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/registration")
    }

    return(
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" sx={{color: "white", mt: 3, mb: 3}}>
                    Войдите в свой аккаунт
                </Typography>
                <TextField label="Имя" value={name} onChange={(event)=>setName(event.target.value)} fullWidth sx={{ backgroundColor: "white", mt: 2, mb: 2 }}/>
                <TextField label="Пароль" value={password} onChange={(event)=>setPassword(event.target.value)} fullWidth sx={{ backgroundColor: "white", mt: 2, mb: 2 }}/>
                <Button variant="contained" type="submit" size="large" sx={{mt:2, mb:2}}>
                    Войти
                </Button>
            </form>

            <Stack direction="row" sx={{justifyContent: "center"}}>
                <Typography variant="body2" sx={{color:"white", mt:3, mb: 3}}>
                    Нет аккаунта?
                </Typography>
                <Button variant="text" onClick={handleRedirect} sx={{ textTransform: "none" }}>
                    Зарегестрироваться
                </Button>
            </Stack>
        </Container>
    )
}

export default LoginPage;