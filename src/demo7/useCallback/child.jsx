import React from 'react'

export default function Child(props) {
    console.log('子组件',props);
    const changeName = () => {
        props.onClick('123')
    }
    return (
        <div>
            <div>我是一个子组件，父级传过来的数据：{props.name}</div>
            <button onClick={changeName}>改变name</button>
        </div> 
    )
}
