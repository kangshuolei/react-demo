import React,{useState,useCallback} from 'react'
import Child from './child'
const ChildMemo = React.memo(Child)
export default function UseCallback() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('Child组件')

    const changeName = useCallback(newName => {
        setName(newName)
    },[])
    return (
        <div>
            <button onClick={e => {setCount(count + 1)}}>加一</button>
            <p>count:{count}</p>
            <ChildMemo name={name} onClick={changeName} />
        </div>
    )
}
