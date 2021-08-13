import React,{useState,useEffect} from 'react'
export default function Demo6() {
    const WithSize = Component => {
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
        return () =>{
            return (
                <Component xPos={xPos} yPos={yPos}/>
            )
        }
        
    }
    const Sub = props => {
        return (
            <div>
                <button>x:{props.xPos} ----- y:{props.yPos}</button>
            </div>
        )
    }
    const Foo = props => {
        return (
            <div>
                <p>x:{props.xPos} ----- y:{props.yPos}</p>
            </div>
        )
    }
    const SubWithSize = WithSize(Sub)
    const FooWithSize = WithSize(Foo)
    return (
        <div>
            <SubWithSize />
            <FooWithSize />
        </div>
    )
}
