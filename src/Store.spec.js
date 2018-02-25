import { getState, init, mutate, subscribe } from './Store'

describe('Store tests', () => {

    it('init state', () => {
        init(state => {
            state.message = 'hello pinetree'
        })

        expect(getState().message).toEqual('hello pinetree')
    })

    it('mutate state', () => {
        init(state => {
            state.message = 'hello pinetree'
        })

        mutate(state => {
            state.message = 'hello world'
        })

        expect(getState().message).toEqual('hello world')
    })

    it('subscribe state', () => {
        const subscriber = jest.fn()
        const unsubscribe = subscribe(state => subscriber(state))

        init(state => {
            state.message = 'hello pinetree'
        })

        mutate(state => {
            state.message = 'hello world'
        })

        unsubscribe()

        expect(subscriber.mock.calls.length).toEqual(2)
    })

    it('unsubscribe', () => {
        const subscriber = jest.fn()
        const unsubscribe = subscribe(state => subscriber(state))

        init(state => {
            state.message = 'hello pinetree'
        })

        unsubscribe()

        mutate(state => {
            state.message = 'hello world'
        })

        expect(subscriber.mock.calls.length).toEqual(1)
    })
})
