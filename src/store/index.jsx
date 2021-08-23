import {applyMiddleware, createStore } from 'redux'
import modules from './modules'
import promiseMiddleware from 'redux-promise'

export default createStore (
    modules, 
    applyMiddleware(promiseMiddleware) 
)