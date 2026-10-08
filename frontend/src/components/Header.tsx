import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#1E293B"
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontWeight: 600
                    }}
                >
                    Поход на события вместе
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        component={RouterLink}
                        to="/events"
                        sx={{
                            color: "#FFFFFF",
                            textTransform: "none"
                        }}
                    >
                        Все события
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/events/joined"
                        sx={{
                            color: "#FFFFFF",
                            textTransform: "none"
                        }}
                    >
                        Мои события
                    </Button>

                    <Button
                        component={RouterLink}
                        variant="contained"
                        to="/events/create"
                        sx={{
                            backgroundColor: "#3B82F6",
                            color: "#FFFFFF",
                            borderRadius: 2,
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#2563EB"
                            }
                        }}
                    >
                        + Создать событие
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;