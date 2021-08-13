import React,{useState,useEffect} from 'react'

export default function Debounce() {
    const useDebounce =  (value,delay) => {
        const [debounceValue, setDebounceValue] = useState(value)
        useEffect(() => {
            let timeId = setTimeout(()=> setDebounceValue(value),delay)
            return () => clearTimeout(timeId)
        }, [value,delay])
        return debounceValue
    }
    const [text, setText] = useState('')
    const debounceText  = useDebounce(text,500)
    useEffect(() => {
        console.log(debounceText)
    }, [debounceText])
    
    const onChange = (evt) => {
        setText(evt.target.value)
    }
    return (
        <div>
            <input onChange={onChange}/>
        </div>
    )
}
