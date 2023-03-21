// Library
import { useState, useEffect} from 'react'

// Import Components
import Board from './components/Board.js'

// Import CSS
import './App.css';




function App() {

  //----------------Constant Variables----------------------------
  // Players
  const players = [
    {
        name : "player1",
        color: "red"
    },

    {
        name : "player2",
        color: "blue"
    }
  ]

  // Possible Winning comnbinations
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],       // horizontal columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],       // vertical columns
    [0, 4, 8], [2, 4, 6]                   // diagonal lines
  ]




  //--------------------State----------------------------
  const [boxColors, setBoxColors] = useState(
    [
        {id: "0", color: ""}, 
        {id: "1", color: ""},
        {id: "2", color: ""},
        {id: "3", color: ""},
        {id: "4", color: ""},
        {id: "5", color: ""},
        {id: "6", color: ""},
        {id: "7", color: ""},
        {id: "8", color: ""}
    ]
  )

  const [gameState, setGameState] = useState(
    {
        activePlayer: players[0].name,
        winner: "",
        showWinLine: false
    }
  )

  const [winPath, setWinPath] = useState({
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "0"
  })




  //--------------Data Mapping: Turn an array of Javascript objects into an array of JSX div elements -----------
  const boxElements = boxColors.map((box) =>{
    return <div 
            key={box.id}
            id={box.id} 
            className='box' 
            style={{backgroundColor: box.color}} 
            onClick={handleClick}
            >

            </div>
  })




  //----------------Event Handler---------------------------------- 
  function handleClick(event){
        
    // If there is already a winner don't bother
    if (!(gameState.winner === "")){return}

    // Get boxId and background Color of div
    const {id, style} = event.target;
    const boxId = id
    const boxCurrentColor = style.backgroundColor

    
    // Change color only if it is blank
    if (boxCurrentColor === ""){
  
        // Get the active Player's color
        const activePlayerColor = players.find(player => player.name === gameState.activePlayer).color;

        // Use the id to update that particular box
        setBoxColors(prevBoxColors => {
            // Spread the old array in the new one
            const newBoxColors = [...prevBoxColors]

            // Identify the box that needs its color updated
            const selectedBox = newBoxColors.find(box => box.id === boxId)

            // Update box color
            selectedBox.color = activePlayerColor

            return newBoxColors
        })

        // Update the game state (Switch to the next player, and )
        setGameState(prevGameState => {
            return {
                ...prevGameState, 
                activePlayer: prevGameState.activePlayer === players[0].name ? players[1].name : players[0].name
            }
        })
    }

  }

  function clearGrid(){

    // Clear Box colors
    setBoxColors(prevBoxColors => {
        return prevBoxColors.map((box) => {
            return {
                id: box.id,
                color: ""
            }
        })
    })

    // Reset Game State
    setGameState(prevGameState => {
        return {
            activePlayer: players[0].name,
            winner: "",
            showWinLine: false
        }
    })
  }




  //------------------Game Logic--------------------------------------
  // Algorithim to check winner
  function checkWinner(){
    for(let winCombo of winningCombos){

        // Get the index of the boxes
        const [boxA, boxB, boxC] = winCombo

        // Check if they are all set to the same color
        if(boxColors[boxA].color && boxColors[boxA].color === boxColors[boxB].color && boxColors[boxB].color === boxColors[boxC].color){
            // console.log(boxColors[boxA].color)
            // Return the winning color
            return {
                color: boxColors[boxA].color,
                boxId: winCombo
            }
        }
    }

    return null
  }




  //------------------Use Effect----------------------------------
  useEffect(() => {

    // Check the winner
    const winner = checkWinner()

    // Return if there is no winner
    if (winner == null){return}

    // If there is a winner {Get the winner's name}
    const winnerName = players.find( player => player.color === winner.color).name

    // Update the Game State with the winner
    setGameState(prevGameState => {
        return {...prevGameState, winner: winnerName, showWinLine: true}
    })

    // Get the original box DOM element directly using the DOM
    const firstBoxElement = document.getElementById(winner.boxId[0])
    const lastBoxElement = document.getElementById(winner.boxId[2])

    // Calculate the center of both boxes
    const centerX1 = firstBoxElement.offsetLeft + firstBoxElement.offsetWidth / 2
    const centerY1 = firstBoxElement.offsetTop + firstBoxElement.offsetHeight / 2
    const centerX2 = lastBoxElement.offsetLeft + lastBoxElement.offsetWidth / 2
    const centerY2 = lastBoxElement.offsetTop + lastBoxElement.offsetHeight / 2

    setWinPath({
            x1: centerX1,
            y1: centerY1,
            x2: centerX2,
            y2: centerY2
    })
    console.log(`X1: ${firstBoxElement.offsetLeft} Y1: ${firstBoxElement.offsetTop}
                 X2: ${lastBoxElement.offsetLeft} Y2: ${lastBoxElement.offsetTop}
    `)
    
    
  }, [boxColors])



  
  //--------------------Render--------------------------
  return (
    <div className="App">
      <h1 className="App-header">Tic-Tac-Toe</h1>
      <Board boxElements={boxElements} showWinLine={gameState.showWinLine} winPath={winPath}/>

      {/* Winner information */}
      {gameState.winner && <p>{gameState.winner} won the game</p>}
      
      <button onClick={clearGrid}>Restart</button>
    </div>
  );
}

export default App;
