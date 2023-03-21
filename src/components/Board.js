// Library
import React from 'react'

// CSS
import '../css/Board.css'

export default function Board(props){
    
    // Render component
    return (
        <div className='board'>
            <div className='grid'>
                {props.boxElements}
            </div>
        </div>
        
    )
}