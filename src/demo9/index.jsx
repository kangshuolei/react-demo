import React,{createContext,useContext,useState} from 'react'
const ChildContext = createContext(null)
function Demo9() {
    const [num,setNum] = useState(0) 
    return (
        <ChildContext.Provider value={{num,setNum}}>
            <button onClick={() =>{setNum(num + 1 )}}>这是爷爷:{num}</button>
            <Baba></Baba>
        </ChildContext.Provider>
    )
}

const Baba = () => {
    return (
        <div>
            这是爸爸
            <Child></Child>
        </div>
    )
}

const Child = () => {
    const {num,setNum} = useContext(ChildContext)
    console.log(num)
    const add = () => {
        setNum(num + 1)
    }
    return (
        <div>
            这是儿子:  num:{num}
            <button onClick={add}>加1</button>
        </div>
    )
}

export default Demo9
