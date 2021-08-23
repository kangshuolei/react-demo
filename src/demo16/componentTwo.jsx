import React from 'react'

export default function ComponentTwo(props) {
    return (
        <div>
            <h1>组件一传过来的值：{props.msg}</h1>
        </div>
    )
}
