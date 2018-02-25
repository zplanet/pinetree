import React from 'react'
import { mount } from 'enzyme'
import { getState, init, mutate, subscribe } from './Store'
import { connect } from './ReactWrapper'

describe('ReactWrapper tests', () => {

    init(state => {
        state.message = 'hello pinetree',
        state.todos = []
    })

    beforeEach(() => {
        mutate(state => {
            state.message = 'hello pinetree',
            state.todos = []
        })            
    })

    it('connect should pass store data to component', () => {

        const TestComponent = connect(
            state => ({message: state.message, todos: state.todos})
        )(props => (<div><span>{props.message}</span><ul>{props.todos.map((t,i) => <li key={i}>t</li>)}</ul></div>))

        const component = mount(<TestComponent />)

        expect(component.find('span').text()).toEqual('hello pinetree')
        expect(component.find('li').length).toEqual(0)
    })

    it('calling mutate function should change state', () => {

        const TestComponent = connect(
            state => ({message: state.message}),
            mutate => ({
                setMessage: msg => mutate(s => s.message = msg)
            })
        )(props => (<div><span>{props.message}</span><button type='button' onClick={() => props.setMessage('button clicked')}>click me</button></div>))

        const component = mount(<TestComponent />)

        expect(component.find('span').text()).toEqual('hello pinetree')
        
        component.find('button').simulate('click')

        expect(component.find('span').text()).toEqual('button clicked')
    })
})
