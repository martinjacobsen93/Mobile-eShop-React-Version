import './App.css';
import NavBar from './components/NavBar';
import TituloBienvenida from './components/TituloBienvenida';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <h2 className="text-success mt-2">Hola Mundo!</h2>
      <TituloBienvenida />
    </div>
  );
}

export default App;
