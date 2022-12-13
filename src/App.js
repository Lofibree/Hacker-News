import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import { Route, Router, Routes } from 'react-router-dom';
import ParticularNew from './components/ParticularNew/ParticularNew';
import { Container } from '@mui/material';

function App() {
  return (
    // <div className="App">
    <Container maxWidth='lg'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/news/:id' element={<ParticularNew />} />
      </Routes>
    </Container>
    // </div>
  );
}

export default App;
