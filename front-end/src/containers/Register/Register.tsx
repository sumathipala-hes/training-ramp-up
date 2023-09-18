// import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Card, TextField, Typography, Button, Grid, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isValidEmail, routePaths, userRoles } from "../../utils";
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

function Register(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(userActions.setErrorStatus(null))
    },[]);

    //initialize error status and msg for users
    const errorStatus = useSelector((state: {users: any; errorStatus:boolean} ) => state.users.errorStatus);
    const errorMessage = useSelector((state: {users: any; errorMsg:string | null} ) => state.users.errorMsg);

    //redirect user to signing after a succesfull registraion
    useEffect(() =>{
        if(errorStatus === false){
            dispatch(userActions.setErrorStatus(null))
            navigate(routePaths.signIn);
        }
    },[ errorStatus, navigate, dispatch]);
      
    const [errorEmail, setErrorEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [passErrorStat, setPassErrorStat] = useState("success");
    const [passError, setPassError] = useState(true);
    const [focused, setFocused] = useState(false);
    const [errorValidate,setValidate] = useState(false);

    //confirm password field validation
    function confirmPassHandler(event: { target: { value: string } }) {
        setFocused(true)
        if (event.target.value === password) {
            setPassErrorStat("success");
            setPassError(false);
            setValidate(false);
        } else {
            setPassErrorStat("error");
            setPassError(true);
        }
    }

    //password update
    function passHandler(event: { target: { value: string } }) {
        setPassword(event.target.value);
    }

    //navigate to signing page
    const linkHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate(routePaths.signIn);
    }

    //mail field validation
    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    //form submit validation
    const submitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email") as string;
        const password = formData.get("password");
        if(isValidEmail(email) && !passError){
            setErrorEmail(false);
            setValidate(false);
            const registeredUser = {
                username : email,
                name : name,
                password : password,
                role : userRoles.user
            }
            dispatch(userActions.register(registeredUser));
        }else{
            if(!isValidEmail(email)){
                setErrorEmail(true);
            }
            if(passError){
                setValidate(true);
            }
        }
    }

    return (
        <React.Fragment>
          <Card variant="outlined" sx={cardStyles}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2} direction="column" alignItems={"center"} justifyContent={"center"} >
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" sx={{ color: "#039BE5"}}>
                            Register
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" sx={{ marginBottom: "30px" }}>
                            Do you have an account?
                            <Link href="#" onClick ={linkHandler} > SignIn</Link>
                            </Typography>
                        </Grid>
                        {errorStatus &&
                        <Alert severity="error">{errorMessage}</Alert>
                        }
                        <Grid item xs={12}>
                            <TextField name="name"  size="small" label="Name" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="email" error={errorEmail}  helperText={errorEmail ? "Enter a valid email address" : ""}  onChange={mailChangeHandler}   size="small" label="Email address" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="password" onChange={passHandler}  focused={false} size="small" label="Password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="repass" error={errorValidate} helperText={errorValidate ? "Passwords are not matching" : ""} onChange={confirmPassHandler} focused={focused} color={passErrorStat as "error" | "success"}  size="small" label=" Confirm password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12} alignContent={"center"}>

                            <Button type="submit" size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
          </Card>
        </React.Fragment>
    );
}


export default Register;
