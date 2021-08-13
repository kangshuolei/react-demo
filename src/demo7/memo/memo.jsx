import React,{useState} from 'react'
import Child from './child'
const ChildMemo = React.memo(Child)
export default function Memo() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={e => {setCount(count + 1)}}>加1</button>
            <p>count:{count}</p>
            <ChildMemo />
        </div>
    )
}
