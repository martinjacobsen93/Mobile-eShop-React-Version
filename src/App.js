import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacto from './pages/Contacto';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contacto" element={<Contacto />}/>

          <Route path="/productos" element={<ItemListContainer titulo={'Tienda de celulares'} />} />

          <Route path="/productos/:marcaId" element={<ItemListContainer titulo={'Filtrado por categoría'} />} /> {/* FILTRADO POR CATEGORIA*/}

          <Route path="/producto/:productoId" element={<ItemDetailContainer /> }/> {/* VISTA DEL DETALLE DE CELULAR*/}

          <Route path="*" element={<Error404 />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;