
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/landing';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className='content'>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/products" element={<Products />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
