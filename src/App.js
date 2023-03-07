import logo from './logo.svg';
import './App.css';

import Board from './components/Board.js'


function App() {


  // Render Component
  return (
    <div className="App">
      <header className="App-header">
        Tic-Tac-Toe
        
      </header>

      <Board/>
    </div>
  );
}

export default App;
