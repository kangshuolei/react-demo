import React,{useState} from 'react'
import ComponentTwo from './componentTwo'
import ComponentOne from './componentOne'
export default function Demo16() {
    const [msg, setMsg] = useState('')
    const handleClick = msg => {
        setMsg(msg)
    }
    return (
        <div>
            <ComponentOne handleClick={handleClick}/> 
            <ComponentTwo msg={msg}/>
        </div>
    )
}
