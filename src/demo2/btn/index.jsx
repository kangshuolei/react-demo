import React,{useState } from 'react'
import { Button } from 'antd'
import Tree from "../tree/index"
import { MyContext } from '../context-manager'
export default function Btn() {
    
    let id = null
    const onClick = (params) => {
        id = '0-0-0-0'
    }
    const [ count, setCount ] = useState(0)
    return (
        <>
            <div>
                <Button type="primary" onClick={() => { setCount(count + 1)}}>点击自动选择</Button>
                <div>{count}</div>
            </div>

            <MyContext.Provider value={count}>
                <Tree />
            </MyContext.Provider>
        </>
    )
}
