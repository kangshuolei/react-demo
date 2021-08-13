import React,{useState,useEffect} from 'react'
export default function Demo11() {
    const useWithSize = () => {
        const [xPos, setxPos] = useState(document.documentElement.clientWidth)
        const [yPos, setyPos] = useState(document.documentElement.clientHeight)
        useEffect(() => {
            window.addEventListener('resize',getPos)
            return () => {
                window.removeEventListener('resize',getPos)
            }
        }, [])
        const getPos = () => {
            setxPos(document.documentElement.clientWidth)
            setyPos(document.documentElement.clientHeight)
        }
        return {xPos,yPos}
    }
    const Sub = props => {
        const {xPos,yPos} = useWithSize() 
        return (
            <div>
                <button>x:{xPos} ----- y:{yPos}</button>
            </div>
        )
    }
    const Foo = props => {
        const  {xPos,yPos} = useWithSize() 
        return (
            <div>
                <p>x:{xPos} ----- y:{yPos}</p>
            </div>
        )
    }
    return (
        <div>
            <Sub />
            <Foo />
        </div>
    )
}
