import { BrowserRouter, Route, Switch as Routes } from 'react-router-dom';
import './App.css';
import Details from './pages/Details/Details';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App" data-testid='app'>
     <BrowserRouter>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/details" component={Details} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
