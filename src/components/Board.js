// Library
import { useRef, useLayoutEffect } from 'react'
import { gsap } from "gsap"

// CSS
import '../css/Board.css'

export default function Board(props){
    
    // --------------UseRef----------------------------
    const winLineRef = useRef(null);

    //--------------UseLayoutEffect (Animate Elements) --------------------
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
        
    }, [props.winPath]);

    //--------------- Render component------------------
    return (
        <div className='board'>
            <div className='grid'>
                {props.boxElements}
                {
                    props.showWinLine &&
                    <svg ref={winLineRef} className="win-line" width="300" height="300">
                        <line x1={props.winPath.x1} y1={props.winPath.y1} x2={props.winPath.x2} y2={props.winPath.y2} stroke='white' strokeWidth="7"/>
                    </svg>
                }
                
            </div>
        </div>
        
    )
}