export function reducerSwitcher(reducers) {
    return (state,action) => reducers[action.type] ? 
    reducers[action.type](state,action) : reducers['init'](state,action)
}