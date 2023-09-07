import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './containers/MainPage.tsx/MainPage';
import { SignUp } from './containers/SignUpPage/SignUpPage';
import { Login } from './containers/LoginPage/LoginPage';
import { Admin } from './containers/AdminPage/AdminPage';
import { routes } from './utils/RoutePaths';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={routes.main} element={<Main />} />
          <Route path={routes.register} element={<SignUp />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.admin} element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
