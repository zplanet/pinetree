import produce from 'immer'

let rootState = {}
let subscribers = []

const getState = () => rootState
const setState = (s) => rootState = s

const subscribe = (fn) => {

    if ((typeof fn) !== 'function') {
        throw new Error('first argument should be a function')
    }

    subscribers.push(fn)
    return function() {
        subscribers = subscribers.filter(sfn => sfn !== fn)
    }
}

const mutate = (fn) => {

    if ((typeof fn) !== 'function') {
        throw new Error('first argument should be a function')
    }

    const newState = produce(getState(), fn)

    setState(newState)
    
    subscribers.forEach(sfn => {
        sfn(newState)
    })
}

export {
    getState,
    subscribe,
    mutate,
    mutate as init
}