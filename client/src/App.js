import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap'
import TFNavbar from './components/TFNavbar';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <>
      <TFNavbar />
      <Container fluid>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
