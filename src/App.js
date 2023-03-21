// Import CSS
import './App.css';

// Import Components
import Board from './components/Board.js'


function App() {


  // Render Component
  return (
    <div className="App">

      <h1 className="App-header">Tic-Tac-Toe</h1>

      <Board/>
      
    </div>
  );
}

export default App;
