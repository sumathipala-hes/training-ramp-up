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
import { useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

interface IUserEntry {
  id: number;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

const SignUp = () => {
  const [selectedGender, setSelectedGender] = useState(genderEnum.MALE);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const _nameRegExp = /^[a-zA-Z ]+$/;
  const _addressRegExp = /^[a-zA-Z0-9 ]+$/;
  const _telNoRegExp = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
  const _emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const _passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const handleGenderChange = (newValue: React.SetStateAction<genderEnum>) => {
    setSelectedGender(newValue);
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        if (!_nameRegExp.test(value)) {
          setNameError("Invalid Name");
        } else {
          setNameError("");
        }
        break;
      case "address":
        if (!_addressRegExp.test(value)) {
          setAddressError("Invalid Address");
        } else {
          setAddressError("");
        }
        break;
      case "mobileNumber":
        if (!_telNoRegExp.test(value)) {
          setMobileNumberError("Invalid Mobile Number");
        } else {
          setMobileNumberError("");
        }
        break;
      case "email":
        if (!_emailRegExp.test(value)) {
          setEmailError("Invalid Email");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!_passwordRegExp.test(value)) {
          setPasswordError("Invalid Password");
        } else {
          setPasswordError("");
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!nameError && !addressError && !mobileNumberError && !emailError && !passwordError) {
      const newUser: IUserEntry = {
        id: -1,
        roleType: "USER",
        name: data.get("name") as string,
        address: data.get("address") as string,
        email: data.get("email") as string,
        mobileNumber: data.get("mobileNumber") as string,
        dob: data.get("dob") as string,
        password: data.get("password") as string,
        gender: selectedGender as string,
      };
      dispatch(userActions.saveAndUpdateUserEntry(newUser));
      event.currentTarget.reset();
      setTimeout(() => {
        navigate(SIGN_IN);
      }, 1000);
    } else {
      alert("Please fill all the fields correctly");
    }
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
                  error={!!nameError}
                  helperText={nameError}
                  onChange={e => validateField("name", e.target.value)}
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
                  error={!!addressError}
                  helperText={addressError}
                  onChange={e => validateField("address", e.target.value)}
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
                  error={!!mobileNumberError}
                  helperText={mobileNumberError}
                  onChange={e => validateField("mobileNumber", e.target.value)}
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
                  error={!!emailError}
                  helperText={emailError}
                  onChange={e => validateField("email", e.target.value)}
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
                  error={!!passwordError}
                  helperText={passwordError}
                  onChange={e => validateField("password", e.target.value)}
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
