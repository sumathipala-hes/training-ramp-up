// import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Card, TextField, Typography, Button, Grid, Alert, MenuItem, Snackbar, AlertColor } from "@mui/material";
import { isValidEmail, routePaths, userRoles } from "../../utils";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cardStyles = {
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "16px",
    maxWidth:"400px"
};

function Admin(){

    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [isSnackOpen, setSnackOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Initialize as true
    const [authenticated, setAuthenticated] = useState(false)
  
    useEffect(() => {
      async function checkAuthentication() {
        try {
          const response= await axios.post(
            'http://localhost:4000/auth',
            {
              // Request body
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
  
          if (response.data.status === 200) {
            if(response.data.data.role === userRoles.admin){
                setAuthenticated(true);
            }
          } else {
            setAuthenticated(false);
          }
        } catch (error) {
          setAuthenticated(false);
        } finally {
          setLoading(false);
        }
      }
  
      checkAuthentication();
    }, []);
  
    if (loading) {
      return null; 
    }

    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    const submitHandler = async (event: any) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email =  event.target[2].value;
        const password = event.target[4].value;
        const role = event.target[6].value;
        if(isValidEmail(email)){
            setErrorEmail(false);
                const registeredUser = {
                    username : email,
                    name : name,
                    role : role,
                    password: password,
                }
                try {
                    const response = await axios.post('http://localhost:4000/register', registeredUser, {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      withCredentials: true,
                    });
            
                    if (response.data.status === 200) {
                        setSeverity("success");
                        setMessage("user successfully added")
                        setSnackOpen(true);
                    } else {
                      setSeverity("error");
                      setMessage(response.data.error)
                      setSnackOpen(true);
                    }
                } catch (error:any) {
                    setSeverity("error");
                    setMessage(error)
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

    const homeHandler = () => {
        navigate(routePaths.home);
    };

    if(!authenticated){
        return(
            <Card variant="outlined" sx={cardStyles}>
                <Typography variant="h4" align="center" >The page is protected. Administrator access is required for entry.</Typography>    
                <Button onClick={homeHandler} size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >Go Back To Home</Button>
            </Card>
        )
    }else{
    return (
        <React.Fragment>
            <Header name={"test"} isAdmin={true}/>
            <Card variant="outlined" sx={cardStyles}>
                    <form onSubmit={submitHandler}>
                        <Grid container spacing={2} direction="column" alignItems={"center"} justifyContent={"center"} >
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" sx={{ color: "#039BE5"}}>
                                Add new User
                                </Typography>
                            </Grid>
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
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
            </Card>
        </React.Fragment>
    );
    }
}


export default Admin;
