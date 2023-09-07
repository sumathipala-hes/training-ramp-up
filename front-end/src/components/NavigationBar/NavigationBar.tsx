import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userRole = useSelector((state: any) => state.user.currentUserRole);
  const currentUser = useSelector((state: any) => state.user.currentUsername);

  const handleAddUsers = () => {
    navigate('/admin');
  };
  const handleViewUserTable = () => {
    navigate('/main');
  };

  const handleLogOutClick = async () => {
    dispatch(logoutUser())
    navigate('/');
  };

  return (
    <Box
      sx={{
        height: 'auto',
        backgroundColor: '#161717',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6" sx={{ color: 'white' }}>
        {' '}
        {currentUser}{' '}
      </Typography>
      <Box>
        {userRole === 'admin' && (
          <>
            <Button
              onClick={handleAddUsers}
              sx={{ color: 'white', marginRight: '5px' }}
            >
              Add Users
            </Button>
            <Button
              onClick={handleViewUserTable}
              sx={{ color: 'white', marginRight: '5px' }}
            >
              View User Table
            </Button>
          </>
        )}
        <Button onClick={handleLogOutClick} sx={{ color: 'white' }}>
          LogOut
        </Button>
      </Box>
    </Box>
  );
};
