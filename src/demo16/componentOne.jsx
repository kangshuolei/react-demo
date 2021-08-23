import React from 'react'

export default function ComponentOne(props) {
    return (
        <div>
            <h1>Demo组件1</h1>
            <button onClick={() => {props.handleClick('组件1的值')}}>点击按钮传给组件2值</button>
        </div>
    )
}
