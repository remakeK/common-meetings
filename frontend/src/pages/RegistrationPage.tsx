import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationPage(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const handleSubmit = (event: React.FormEvent) => {event.preventDefault();
        if(password !== confirmation){
            return;
        }
        const newUser = {
            id: 67,
            name: name,
            password: password
        };
        console.log(newUser);

        setName("");
        setPassword("");
        setConfirmation("");
    }

    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate("/login");
    }

    return(
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" sx={{color: "white", mt: 3, mb: 3}}>
                    Регистрация
                </Typography>
                <TextField label="Имя" value={name} onChange={(event)=>setName(event.target.value)} fullWidth sx={{ backgroundColor: "white", mt: 2, mb: 2 }}/>
                <TextField label="Пароль" value={password} onChange={(event)=>setPassword(event.target.value)} fullWidth sx={{ backgroundColor: "white", mt: 2, mb: 2 }}/>
                <TextField label="Подтверждение пароля" value={confirmation} onChange={(event)=>setConfirmation(event.target.value)} fullWidth sx={{ backgroundColor: "white", mt: 2, mb: 2 }}/>
                <Button variant="contained" type="submit" size="large" sx={{mt:2, mb:2}}>
                    Подтвердить
                </Button>
            </form>

            <Stack direction="row" sx={{justifyContent: "center"}}>
                <Typography variant="body2" sx={{color:"white", mt:3, mb: 3}}>
                    Уже есть аккаунт?
                </Typography>
                <Button variant="text" onClick={handleRedirect} sx={{ textTransform: "none" }}>
                    Войти
                </Button>
            </Stack>
        </Container>
    )
}

export default RegistrationPage;