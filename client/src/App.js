import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import About from './pages/About';
import { MainLayout, AuthLayout } from './layouts/tf-layouts';
import AuthProvider from './contexts/authContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='/signup' element={<AuthLayout />} >
              <Route index element={<SignUp />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
