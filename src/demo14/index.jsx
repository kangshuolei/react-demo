import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {actions as redusTest } from '../store/modules/reduxTest'

export default function Demo14() {
    const {count} = useSelector(state => state.reduxTest)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [])
    const xiangjia = () => {
        dispatch(redusTest.add(1))
    }
    return (
        <div>
            <span>{count}</span>
            <button onClick={xiangjia}>相加</button>
        </div>
    )
}
