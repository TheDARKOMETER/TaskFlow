import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap'
import TFNavbar from './components/TFNavbar';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <TFNavbar />
      <Container fluid className='pe-0 ps-0'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </>
  );
}

export default App;
