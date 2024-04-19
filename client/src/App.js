import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigation from './components/Navigation';
import OtpLogin from './pages/OtpLogin';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/otp" element={<OtpLogin />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
