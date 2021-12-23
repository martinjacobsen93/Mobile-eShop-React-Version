import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer'
import ItemCount from './components/ItemCount'
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ItemListContainer greeting={'Tienda de celulares'}/>
      <ItemCount stock={5} initial={1}/>
      <ItemList />
    </div>
  );
}

export default App;
