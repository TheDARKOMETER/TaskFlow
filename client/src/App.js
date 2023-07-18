import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap'
import TFNavbar from './components/TFNavbar';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <>
      <TFNavbar />
      <Container fluid>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
