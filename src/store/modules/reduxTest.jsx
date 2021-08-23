import React from 'react'
import { reducerSwitcher } from '../switcher'

const defaultState = {
    count:0
}
const reducers = {
    init:(state = defaultState,action) =>{
        return {
            ...state,
            ...action.payload
        }
    },
    add:(state = defaultState,action) => {
        //let res = state.count + action.payload 
        console.log(action);
        return {
            ...state,
            ...action.payload
        }
    }
}
export const actions = {
    init: async payload =>{
        return {
            type:'init',
            payload:0
        }
    },
    add: async payload =>{
        console.log(payload);
        return {
            type: 'add',
            payload:{count:payload}
        }
    }
}
export default reducerSwitcher(reducers)  