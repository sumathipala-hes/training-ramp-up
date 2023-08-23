import { Button } from '@mui/material';
import { DataTable } from '../components/DataTable';
//import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../api/apiService';

export const Main = () => {
  //const navigate = useNavigate();
  const handleLogOutClick = async () => {
    const response = await logoutApi();
    console.log(response)
}

  return (
    <>
    <Button onClick={handleLogOutClick}>Log Out</Button>
    <div style={{ margin: '80px', height: 'auto' }}>
      <DataTable></DataTable>
    </div>
    </>
  );
};
