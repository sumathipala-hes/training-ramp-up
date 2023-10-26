import React, { useState } from "react";
import { Button, Card, Container, Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/slice";

interface ISignInData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSignIn = () => {
    const signInData: ISignInData = {
      email: email,
      password: password,
    };
    dispatch(userActions.signIn(signInData));
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: "1rem" }}>
            <h1>Sign In</h1>
            <TextField
              label="Username"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSignIn}>
              Sign In
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
