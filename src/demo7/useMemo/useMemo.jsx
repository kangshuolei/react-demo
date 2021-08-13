import React,{useState,useCallback,useMemo} from 'react'
import Child from './child'
const ChildMemo = React.memo(Child)
export default function UseMemo() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('Child组件')
    const [age, setAge] = useState(23)
    const info = useMemo(() => ({name,age}), [name,age])

    const changeName = useCallback(newName => {
        setName(newName)
    },[])
    return (
        <div>
            <button onClick={e => {setCount(count + 1)}}>加一</button>
            <p>count:{count}</p>
            <ChildMemo info={info} onClick={changeName} />
        </div>
    )
}
