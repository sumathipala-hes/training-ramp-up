import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SIGN_IN } from "../../util/routesUtil";
import RowRadioButtonsGroup from "../../components/RowRadioButtonsGroup/RowRadioButtonsGroup";
import { useState } from "react";
import { genderEnum } from "../../enum/genderEnum";

const defaultTheme = createTheme();

const SignUp = () => {
  const [selectedGender, setSelectedGender] = useState(genderEnum.MALE);

  const handleGenderChange = (newValue: React.SetStateAction<genderEnum>) => {
    setSelectedGender(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      roleType: "USER",
      name: data.get("name"),
      address: data.get("address"),
      email: data.get("email"),
      mobileNumber: data.get("mobileNumber"),
      dob: data.get("dob"),
      password: data.get("conPassword"),
      gender: selectedGender,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-mobileNumber"
                  name="mobileNumber"
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="dob" name="dob" type="date" />
              </Grid>
              <Grid container sx={{ paddingTop: "1em" }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <RowRadioButtonsGroup
                    selectedValue={selectedGender}
                    onValueChange={handleGenderChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="conPassword"
                  label="Confirm Password"
                  type="password"
                  id="conPassword"
                  autoComplete="con-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={SIGN_IN} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
