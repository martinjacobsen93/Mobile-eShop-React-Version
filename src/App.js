import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacto from './pages/Contacto';
import Error404 from './pages/Error404';
import Productos from './pages/Productos';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />}/>
          <Route path="/productos" element={<Productos />}/>
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;