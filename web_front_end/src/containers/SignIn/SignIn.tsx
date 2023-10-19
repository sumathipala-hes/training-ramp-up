import React from "react";
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SignIn() {
    return (
        <Box
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
                <TextField
                    size="small"
                    label="User Email"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    size="small"
                    label="User Password"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
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
                    }}
                >
                    Sign In
                    <ArrowForwardIcon />
                </Button>
            </Card>
        </Box>
    );
}
