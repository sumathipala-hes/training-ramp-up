import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../utils";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/userSlice";

function Header(props:{name: string, isAdmin: boolean}){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //handle logout process
  async function logoutHandler(){
    dispatch(userActions.processLogOut());
    navigate(routePaths.signIn);
  }

  //navigate to admin page
  function dashBoardHandler(){
    navigate(routePaths.admin);
  }
  
  return(
    <Box sx={{ flexGrow: 1, width:"100%", position:"fixed", top:"0", right:"0" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STUDENTS
          </Typography>
          {props.isAdmin&& <Button onClick={dashBoardHandler}  color="inherit">Admin</Button>}
          <Button onClick={logoutHandler} color="inherit">Logout</Button>
          <Avatar sx={{ marginLeft:"10px",bgcolor: deepOrange[500] }}>{props.name.charAt(0).toUpperCase()}</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;