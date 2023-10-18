import React, { useState } from "react";
import { Button, Card, Container, Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/slice";

interface IUserData {
  email: string;
  name: string;
  password: string;
  role: string;
  isUpdate: boolean;
}

const Registration = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const user: IUserData = {
      email: email,
      name: name,
      password: password,
      role: "user",
      isUpdate: false,
    };
    dispatch(userActions.saveAndUpdateUser(user));
  };
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: "1rem" }}>
            <h1>Register</h1>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Full Name"
              value={name}
              onChange={e => {
                setName(e.target.value);
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
              Register
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Registration;
