import React,{useState,useRef,useEffect} from 'react'

export default function Demo8() {
    const [count, setCount] = useState(0)
    const intervalRef = useRef(0);
    // useEffect(() => {
    //     console.log(count);
    // }, [count])
    const handleAlertClick = () => {
        // setTimeout(() => {
        //     alert('You clicked on:' + count)
        // },3000)
        // alert('You clicked on:' + count)
        // intervalRef.current = count + 1;
        // setCount(count + 1)
        // console.log(intervalRef);
        setTimeout((params) => {
            setCount(count + 1)
        },100)
        console.log(count);
    }
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <button onClick={handleAlertClick}>
                Show alert
            </button>
        </div>
    )
}
