import React, { Component } from 'react'
import { subscribe, getState, mutate } from './Store'

const connect = (filter, mutator) => (WrapperComponent) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = filter ? filter(getState()) : {}
            this.m = mutator ? Object.assign({mutate}, mutator(mutate)) : {mutate}
        }
        componentDidMount() {
            this.unsubscribe = filter ? subscribe(state => this.setState(filter(state))) : null
        }
        componentWillUnmount() {
            if (this.unsubscribe) { this.unsubscribe() }
        }
        render() {
            const newProps = Object.assign({}, this.state, this.m)
            return (<WrapperComponent {...newProps} />)
        }
    }
}

export {
    connect
}