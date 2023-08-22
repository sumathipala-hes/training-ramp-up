// import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { Card, TextField, Typography, Button, Grid, Alert, MenuItem, Snackbar } from "@mui/material";
import { isValidEmail, userRoles } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/users/userSlice";

const cardStyles = {
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "16px",
    maxWidth:"400px"
};

interface userData {
    name:string ,
    username: string ,
    role: string ,
  }
  
function Admin(){

    const dispatch = useDispatch();

    const users = useSelector((state: {user: any; users:userData[]} ) => state.user.users);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessage, setError] = useState(false);
    const [isSnackOpen, setSnackOpen] = useState(false);

    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email =  event.target[2].value;
        // const password = event.target[4].value;
        const role = event.target[6].value;
        console.log(role)
        if(isValidEmail(email)){
            setErrorEmail(false);
            const userExists = users.some((user: { username: any; }) => user.username === email);
            if(userExists){
                setError(true)
            }else{
                const registeredUser = {
                    username : email,
                    name : name,
                    role : role
                }
                dispatch(userActions.registerUser(registeredUser));
                setSnackOpen(true);
            }
        }else{
            setErrorEmail(true);
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackOpen(false);
      };

    return (
        <React.Fragment>
          <Card variant="outlined" sx={cardStyles}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2} direction="column" alignItems={"center"} justifyContent={"center"} >
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" sx={{ color: "#039BE5"}}>
                            Add new User
                            </Typography>
                        </Grid>
                        {errorMessage &&
                        <Alert severity="error">Already an account with the submitted username is exists</Alert>
                        }
                        <Grid item xs={12}>
                            <TextField  size="small" label="Name" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errorEmail}  onChange={mailChangeHandler}   size="small" label="Email address" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField   size="small" label="Password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select label="User Role" defaultValue={userRoles.user}  variant="outlined" InputProps={{ sx: {  height: "45px", minWidth:"225px"}}} fullWidth required >         
                                <MenuItem value={userRoles.user}>User</MenuItem>
                                <MenuItem value={userRoles.admin}>Admin</MenuItem>                       
                            </TextField>
                        </Grid>
                        <Grid item xs={12} alignContent={"center"}>

                            <Button type="submit" size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >
                                Add User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={isSnackOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        User successfully added
                    </Alert>
                </Snackbar>
          </Card>
        </React.Fragment>
    );
}


export default Admin;
