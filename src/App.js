import logo from './logo.svg';
import './App.css';
import Main from './pages/Main/Main';
import { Route, Router, Routes } from 'react-router-dom';
import FullNew from './components/FullNew/FullNew';
import { Container } from '@mui/material';

function App() {
  return (
    // <div className="App">
    <Container maxWidth='lg'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/news/:id' element={<FullNew />} />
      </Routes>
    </Container>
    // </div>
  );
}

export default App;
