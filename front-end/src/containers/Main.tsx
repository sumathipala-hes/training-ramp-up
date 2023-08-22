import { Button } from '@mui/material';
import { DataTable } from '../components/DataTable';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    navigate('/login')
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
