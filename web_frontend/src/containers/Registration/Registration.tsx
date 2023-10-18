import React from "react";
import { Button, Card, Container, Grid, TextField } from "@mui/material";

const Registration = () => {
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: "1rem" }}>
            <h1>Sign In</h1>
            <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" />
            <TextField label="Full Name" variant="outlined" fullWidth margin="normal" />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <TextField label="Role" variant="outlined" fullWidth margin="normal" />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Registration;
