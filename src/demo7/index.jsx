import React,{useState} from 'react'

export default function Demo7() {
    const [count, setCount] = useState(0)
    const Child = (props) => {
        console.log('子组件')
        return (
            <div>我是一个子组件</div>
        )
    }
    return (
        <div>
            <button onClick={e => {setCount(count + 1)}}>加1</button>
            <p>count:{count}</p>
            <Child />
        </div>
    )
}
