import React,{forwardRef,useRef,useEffect} from 'react'
import useImperativeHandleChild from './useImperativeHandleChild'
export default function UseImperativeHandle() {
    const ref = useRef()
    const Headers = forwardRef(useImperativeHandleChild)
    useEffect(() => {
        ref.current.getData()
    }, [])
    return (
        <div>
            <Headers ref={ref} />
        </div>
    )
}
