import React,{useImperativeHandle} from 'react'

export default function useImperativeHandleChild(props,ref) {
    const getData = () => {
        console.log('子组件的值');
    }
    useImperativeHandle(ref,() =>({
        getData
    }))
    return (
        <></>
    )
}
