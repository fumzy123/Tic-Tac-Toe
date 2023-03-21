// Import CSS
import './App.css';

// Import Components
import Board from './components/Board.js'


function App() {


  // Render Component
  return (
    <div className="App">

      <header className="App-header">Tic-Tac-Toe</header>

      <Board/>
      
    </div>
  );
}

export default App;
