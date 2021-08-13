import React,{useState,useEffect,useRef} from 'react'
import styles from './demo12.module.scss'
export default function Throttle() {
    const useThrottle = (value,delay) => {
        const Local = useRef({flag:true}).current
        const [throttleValue, setThrottleValue] = useState(value)
        useEffect(() => {
            let timer;
            if(Local.flag){
                Local.flag = false
                setThrottleValue(value)
                setTimeout(() => {Local.flag = true},delay)
            } else {
                timer = setTimeout(() => setThrottleValue(value),delay)
            }
            return () => clearTimeout(timer)
        }, [value,delay,Local])
        return throttleValue
    }
    const [text, setText] = useState(null)
    const throttleText = useThrottle(text,1000)
    useEffect(() => {
        window.addEventListener('scroll',e => {
            setText(e)
        })
    }, [])
    useEffect(() => {
        console.log(throttleText);
    }, [throttleText])
    return (
        <div className={styles.main}>
           
        </div>
    )
}
