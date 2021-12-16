import './App.css';
import NavBar from './components/NavBar';
import TituloBienvenida from './components/TituloBienvenida';
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ItemListContainer greeting={'Hola, este es mi nuevo proyecto de React.js'}/>
      <TituloBienvenida />
    </div>
  );
}

export default App;
