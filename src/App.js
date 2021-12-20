import './App.css';
import NavBar from './components/NavBar';
import TituloBienvenida from './components/TituloBienvenida';
import ItemListContainer from './components/ItemListContainer'
import ItemCount from './components/ItemCount'

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <TituloBienvenida /> */}
      <ItemListContainer greeting={'Tienda de celulares'}/>
      <ItemCount stock={5} initial={1}/>
    </div>
  );
}

export default App;
