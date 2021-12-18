import './App.css';
import NavBar from './components/NavBar';
import TituloBienvenida from './components/TituloBienvenida';
import ItemListContainer from './components/ItemListContainer'
import Contador from './components/Contador'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ItemListContainer greeting={'Hola, este es mi nuevo proyecto de React.js'}/>
      <TituloBienvenida />
      <Contador stock={5}/>
    </div>
  );
}

export default App;
