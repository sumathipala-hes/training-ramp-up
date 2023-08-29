import { useEffect, useState } from 'react';
import { Navigate} from 'react-router-dom';
import axios from 'axios';
import { routePaths, userRoles } from '../../utils';
import FullStuTable from '../../components/FullStuTable/FullStuTable';
import ViewStuTable from '../../components/ViewStuTable/ViewStuTable';
import React from 'react';
import Header from '../../components/Header/Header';

interface response {
  data:dataType
}

interface dataType {
  status:number,
  error:string,
  data:userData
}

interface userData{
  name:string,
  role:string,
}

function Home() {
  const [loading, setLoading] = useState(true); // Initialize as true
  const [authenticated, setAuthenticated] = useState(false);
  const [table, setTable] = useState(<FullStuTable isTesting={false}/>);

  //authenticate user
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response:response = await axios.post(
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
          setAuthenticated(true);
          console.log(response.data.data.role)
          if(response.data.data.role === userRoles.admin){
            setTable(
              <React.Fragment>
                <Header name={response.data.data.name} isAdmin={true}/>
                <FullStuTable isTesting={false}/>
              </React.Fragment>
            )
          }else{
            setTable(
              <React.Fragment>
                <Header name={response.data.data.name} isAdmin={false}/>
                <ViewStuTable isTesting={false}/>
              </React.Fragment>
            )
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

  return authenticated ? table : <Navigate to={routePaths.signIn}/>;
}

export default Home;
