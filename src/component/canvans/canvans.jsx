import React,{useCallback} from 'react'
import './canvans.scss'
export default function Canvans(props) {
    let {hotRef} = props
    const canvansRef = useCallback(node => {
        if(node !== null){
            hotRef(node)
        }
    },[])
    return (
        <div className="canvas-box" >
            <canvas id="canvans" ref={canvansRef}></canvas>
        </div> 
    )
} 
