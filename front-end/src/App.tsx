import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './containers/Main';
import { SignUp } from './containers/SignUpPage/SignUpPage';
import { Login } from './containers/LoginPage/LoginPage';
import { Admin } from './containers/AdminPage/AdminPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
