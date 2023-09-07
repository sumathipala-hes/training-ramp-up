// import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Card, TextField, Typography, Button, Grid, Alert, MenuItem, Snackbar, AlertColor } from "@mui/material";
import { isValidEmail, routePaths, userRoles } from "../../utils";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/userSlice";

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
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [isSnackOpen, setSnackOpen] = useState(false); 

    const dispatch = useDispatch();

    //initialize error status and msg for users
    const authenticated = useSelector((state: {users: any; authenticated:boolean} ) => state.users.authenticated);
    const user = useSelector((state: {users: any; user:boolean} ) => state.users.user);
    
    //initialize error status and msg for users
    const errorStatus = useSelector((state: {users: any; errorStatus:boolean} ) => state.users.errorStatus);
    const message = useSelector((state: {users: any; errorMsg:string | null} ) => state.users.errorMsg);

    //reset error status
    useEffect(() =>{
      dispatch(userActions.setErrorStatus(null));
      dispatch(userActions.processAutho());
     },[]);

     //set error netofication type
     useEffect(() =>{
      if(errorStatus){
        setSeverity("error");
      }else{
        setSeverity("success");
      }
     },[errorStatus]);

    //mail field validation
    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    //submit form validation and pass data
    const submitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email") as string;
        const role = formData.get("role");
        const password = formData.get("password");
        if(isValidEmail(email)){
            setErrorEmail(false);
                const registeredUser = {
                    username : email,
                    name : name,
                    role : role,
                    password: password,
                }
                dispatch(userActions.register(registeredUser));
                setSnackOpen(true);
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

    //home button handler
    const homeHandler = () => {
        navigate(routePaths.home);
    };

    if(!authenticated || user.role === userRoles.user){
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
                                <TextField  size="small" name="name" label="Name" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField error={errorEmail} name="email"  onChange={mailChangeHandler}   size="small" label="Email address" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField   size="small" name="password" label="Password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField select name="role" label="User Role" defaultValue={userRoles.user}  variant="outlined" InputProps={{ sx: {  height: "45px", minWidth:"225px"}}} fullWidth required >         
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
            <Button   onClick={() => {navigate(routePaths.home)}} variant="contained" sx={{ borderRadius: "16px", marginTop: "50px" }} >Go Back Home</Button>
        </React.Fragment>
    );
    }
}
export default Admin;
