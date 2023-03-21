// Library
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from "gsap"

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

    // Event Handler: 
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

        // Clear GameState
        setGameState(prevGameState => {
            return {
                activePlayer: players[0].name,
                winner: "",
                showWinLine: false
            }
        })
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

     // Effects
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


    // console.log(winPath)

    // Use Ref
    const winLineRef = useRef(null);

    // UseLayoutEffect
    useLayoutEffect(() => {
        console.log(winLineRef)
        if (winLineRef.current == null ) { return }
        // Get the line and its length
        const line = winLineRef.current.querySelector('line')
        const length = line.getTotalLength();
        console.log(line, length)
        
        // Animate the line
        gsap.set(line, {strokeDasharray: length, strokeDashoffset: length})
        gsap.to(line, {strokeDashoffset: 0, duration: 2})

    }, [winPath]);

    console.log(gameState.showWinLine)
    // Render component
    return (
        <div className='board'>

            <div className='grid'>
                {boxElements}
            </div>

            
            <button onClick={clearGrid}>Restart</button>
            
            {/* Winner information */}
            {gameState.winner && <p>{gameState.winner} won the game</p>}

            {/* SVG Line gameState.showWinLine && */}
            {gameState.showWinLine && 
            <svg ref={winLineRef} className="win-line" width="300" height="300">
                <line x1={winPath.x1} y1={winPath.y1} x2={winPath.x2} y2={winPath.y2} stroke='white' strokeWidth="7"/>
            </svg>
            }
            
        </div>
        
    )
}