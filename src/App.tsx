import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './pages/Details/Details';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App" data-testid='app'>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
