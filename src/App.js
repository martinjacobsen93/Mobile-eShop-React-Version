import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacto from './pages/Contacto';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer';
import CartPage from './pages/CartPage';
import CartProvider from './context/CartContext'
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>          {/* CONTEXT PROVIDER */}
      <div className="App">
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/contacto" element={<Contacto />}/>

            <Route path="/productos" element={<ItemListContainer titulo={'Tienda de celulares'} />} />

            <Route path="/products/:marcaId" element={<ItemListContainer titulo={'Filtrado por categoría'} />} /> {/* FILTRADO POR CATEGORIA*/}

            <Route path="/producto/:productoId" element={<ItemDetailContainer /> }/> {/* VISTA DEL DETALLE DE CELULAR*/}

            <Route path="/cart" element={<CartPage /> }/>

            <Route path="*" element={<Error404 />}/>
          </Routes>
          <Footer />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;