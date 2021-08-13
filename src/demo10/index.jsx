import React,{useState} from 'react'


const Child = props => {
    console.log(props);
    const cb = msg => {
        return props.callback(msg)
    }
    return (
        <div>
            <button onClick={() => { cb("向父组件传值") }}>向父组件传值</button>
        </div>
    )
}

function Demo10() {
    const [count] = useState(1)
    const callback = msg => {
        console.log(msg);
    }
    return (
        <div>
            <Child callback={callback.bind(this)} />
        </div>
    )
}

export default Demo10
