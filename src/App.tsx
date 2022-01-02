import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './pages/Details/Details';
import Home from './pages/Home/Home';

function App() {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   setInterval(() => {
  //     axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
  //     .then(({ data }) => setPosts(data.hits))
  //   }, 10000)
  // }, [])

  // console.log(posts);
  
  return (
    <div className="App">
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
