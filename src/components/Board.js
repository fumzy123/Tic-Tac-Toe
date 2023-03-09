// Library
import React, { useState, useEffect } from 'react'

// CSS
import '../css/Board.css'

export default function Board(){

    // player 1 = RED and player 2 = BLUE
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


    //--------------------------------------------------------------
    // State
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
    // const [activePlayer, setActivePlayer] = useState(1)
    const [gameState, setGameState] = useState(
        {
            activePlayer: players[0].name,
            winner: ""
        }
    )

    console.log(gameState);
    

    // Event Handler: 
    function handleClick(event){
        
        // If there is already a winner don't bother
        if (!(gameState.winner == "")){return}

        // Get boxId and background Color of div
        const {id, style} = event.target;
        const boxId = id
        const boxCurrentColor = style.backgroundColor

        
        // Change color only if it is blank
        if (boxCurrentColor == ""){
      
            // Get the active Player's color
            const activePlayerColor = players.find(player => player.name == gameState.activePlayer).color;

            // Use the id to update that particular box
            setBoxColors(prevBoxColors => {
                // Spread the old array in the new one
                const newBoxColors = [...prevBoxColors]

                // Identify the box that needs its color updated
                const selectedBox = newBoxColors.find(box => box.id == boxId)

                // Update box color
                selectedBox.color = activePlayerColor

                return newBoxColors
            })

            // Update the game state (Switch to the next player, and )
            setGameState(prevGameState => {
                return {
                    ...prevGameState, 
                    activePlayer: prevGameState.activePlayer == players[0].name ? players[1].name : players[0].name
                }
            })
        }

    }

    // Data Mapping: Represent box states as JSX div elements
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

    // --------------------------------------------------------------
    
    
    // Possible Winning comnbinations
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],       // horizontal columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],       // vertical columns
        [0, 4, 8], [2, 4, 6]                   // diagonal lines
    ]

    // Algorithim to check winner
    function checkWinner(){
        for(let winCombo of winningCombos){

            // Get the index of the boxes
            const [boxA, boxB, boxC] = winCombo

            // Check if they are all set to the same color
            if(boxColors[boxA].color && boxColors[boxA].color == boxColors[boxB].color && boxColors[boxB].color == boxColors[boxC].color){
                console.log(boxColors[boxA].color)
                // Return the winning color
                return boxColors[boxA].color
            }
        }

        return null
    }

     // Effects
     useEffect(() => {

        // Check winner
        const winningColor = checkWinner()

        // Return if there is no winner
        if (winningColor == null){return}

        // If there is a winner {Get the winner's name}
        const winner = players.find( player => player.color == winningColor).name

        // Update the Game State with the winner
        setGameState(prevGameState => {
            return {...prevGameState, winner: winner}
        })

        //  
    }, [boxColors])


    // Render component
    return (
        <div className='grid'>
            
            {boxElements}
            {gameState.winner && <p>{gameState.winner} won the game</p>}
        </div>
    )
}