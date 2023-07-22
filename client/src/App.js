import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import About from './pages/About';
import { MainLayout, AuthLayout } from './layouts/tf-layouts';
import AuthProvider from './contexts/authContext';
import Login from './components/Login';
import RedirectHome from './components/RedirectHome';
import ForgotPassword from './components/ForgotPassword';
import UpdateUserInfo from './components/UpdateUserInfo';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/auth' element={<AuthLayout />}>
              <Route index element={<RedirectHome />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='unauthorized' element={<Unauthorized />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='update-profile' element={<UpdateUserInfo />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
