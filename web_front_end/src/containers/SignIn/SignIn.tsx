import React from "react";
import {
    Button,
    Card,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SignIn() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSignIn = () => {
        console.log("Sign In");
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    margin: "25px",
                    borderRadius: "30px",
                    backgroundColor: "#ECF0F1",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    padding: "1rem",
                    width: "60%",
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontFamily: "Ubuntu, sans-serif",
                        color: "#01ACDC",
                        marginBottom: "30px",
                        fontWeight: "600",
                    }}
                >
                    Sign In
                </Typography>
                <form>
                    <TextField
                        size="small"
                        label="User Email"
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        size="small"
                        label="User Password"
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: "10px",
                            mt: 1,
                            backgroundColor: "#01ACDC",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#01ACDC" },
                            gap: "10px",
                            fontFamily: "Ubuntu, sans-serif",
                        }}
                        onClick={handleSignIn}
                    >
                        Sign In
                        <ArrowForwardIcon />
                    </Button>
                </form>
            </Card>
        </Container>
    );
}
