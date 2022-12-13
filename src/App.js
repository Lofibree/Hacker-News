import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import { Route, Router, Routes } from 'react-router-dom';
import ParticularNew from './components/ParticularNew/ParticularNew';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/news/:id' element={<ParticularNew />} />
      </Routes>
    </div>
  );
}

export default App;
