// import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { Card, TextField, Typography, Button, Grid, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isValidEmail, routePaths } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/users/userSlice";

const cardStyles = {
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
    borderRadius: "16px",
    maxWidth:"400px"
  };

  interface userData {
    name:string ,
    username: string ,
    role: string ,
  }
  
function SignIn(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector((state: {user: any; users:userData[]} ) => state.user.users);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessage, setError] = useState(false);

    const linkHnadler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate(routePaths.register);
    }

    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        console.log(event.target[2].value)
        const email =  event.target[0].value;
        const password = event.target[2].value;
        if(isValidEmail(email)){
            setErrorEmail(false);
            const userExists = users.some((user: { username: any; }) => user.username === email);
            if(userExists){
                const signedUser = {
                    username : email,
                    password : password
                }
                dispatch(userActions.signUser(signedUser));
                navigate(routePaths.home);
            }else{
                setError(true);
            }
        }else{
            setErrorEmail(true);
        }
    }

    return (
        <React.Fragment>
          <Card variant="outlined" sx={cardStyles}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2} direction="column" alignItems={"center"} justifyContent={"center"} >
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" sx={{ color: "#039BE5"}}>
                            Sign In
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" sx={{ marginBottom: "30px" }}>
                            Don't you have an account?
                            <Link href="#" onClick ={linkHnadler} > Register</Link>
                            </Typography>
                        </Grid>
                        {errorMessage &&
                        <Alert severity="error">The provided username or password / both the inputs are invalid  </Alert>
                        }
                        <Grid item xs={12}>
                            <TextField error={errorEmail}  onChange={mailChangeHandler}   size="small" label="Email address" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField   size="small" label="Password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12} alignContent={"center"}>
                            <Button type="submit" size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
          </Card>
        </React.Fragment>
    );
}

export default SignIn;
