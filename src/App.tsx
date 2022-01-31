import './App.css';
import GameContainer from './game/GameContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Elephants on Parade</h2>
        <GameContainer />
        <h4>
          images sourced from <a href="https://www.uliwestphal.de/elephas-anthropogenus/index.html">uliwestphal.de</a>
        </h4>
      </header>
    </div>
  );
}

export default App;
