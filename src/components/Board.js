// Library
import React, { useState } from 'react'

// CSS
import '../css/Board.css'

export default function Board(){
    
    // State
    const [boxColors, setBoxColors] = useState(
        [
            {id: "1", color: ""}, 
            {id: "2", color: ""},
            {id: "3", color: ""},
            {id: "4", color: ""},
            {id: "5", color: ""},
            {id: "6", color: ""},
            {id: "7", color: ""},
            {id: "8", color: ""},
            {id: "9", color: ""}
        ]
    )
    const [activePlayer, setActivePlayer] = useState(1)

    

    // Event Handler: player 1 = RED and player 2 = BLUE
    function handleClick(event){

        // Get the id of the box
        const boxId = event.target.id
        console.log(boxId)

        // Get the color
        const currentColor = event.target.style.backgroundColor

        // Change color only if it is blank
        if (currentColor == ""){
      
            // Decide Color to change it to based on the active player
            const divColor = activePlayer == 1 ? "red" : "blue"

            // Use the id to update that particular box
            setBoxColors(prevBoxColors => {
                // Spread the old array in the new one
                const newBoxColors = [...prevBoxColors]

                // Identify the box that needs its color updated
                const selectedBox = newBoxColors.find((box) => {
                    return box.id == boxId
                })

                // Update it
                selectedBox.color = divColor

                return newBoxColors
            })

            // Change the Active Player
            setActivePlayer(prevActivePlayer => {
                let newActivePlayer = prevActivePlayer;
                if(prevActivePlayer == 1)
                {
                    newActivePlayer = 2
                }
                else if(prevActivePlayer == 2)
                {
                    newActivePlayer = 1
                }

                return newActivePlayer
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



    // Render component
    return (
        <div className='grid'>
            
            {boxElements}

        </div>
    )
}