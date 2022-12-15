import logo from './logo.svg';
import './App.css';
import Main from './pages/Main/Main';
import { Route, Router, Routes } from 'react-router-dom';
import FullNew from './components/FullNew/FullNew';
import { Container } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    // <div className="App">
    <>
      <Header />

    <Container maxWidth='lg'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/news/:id' element={<FullNew />} />
      </Routes>
    </Container>
    <Footer />

    </>
    // </div>
  );
}

export default App;
