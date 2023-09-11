import {userRoles} from '../../utils';
import FullStuTable from '../../components/FullStuTable/FullStuTable';
import ViewStuTable from '../../components/ViewStuTable/ViewStuTable';
import React from 'react';
import Header from '../../components/Header/Header';
import {useSelector} from 'react-redux';

function Home() {
  const user = useSelector((state: {users: any; user:boolean} ) => state.users.user);

    if (user.role === userRoles.admin) {
       return (
        <React.Fragment>
          <Header name={user.name} isAdmin={true} />
          <FullStuTable isTesting={false} />
        </React.Fragment>
       )
    } else {
       return(
        <React.Fragment>
          <Header name={user.name} isAdmin={false} />
          <ViewStuTable isTesting={false} />
        </React.Fragment>  
       )
    }
 }
 
 export default Home;