# Pinetree is a state store for React application

Pinetree is a [immer](https://github.com/mweststrate/immer) based state store for React application.

## How to install

```
$> npm install pinetree --save
```

## How to use

First, you need to initialize state before use it.

index.js
```
import React from 'react'
import ReactDOM from 'react-dom'

import { init } from 'pinetree'
import App from './App'

init(state => {
    state.message = 'hello pinetree'
    state.todos = []
})

ReactDOM.render(<App />, document.getElementById('root'))

```
Second, connect the state to your React component.

App.js
```
import React, { Component } from 'react'
import { connect } from 'pinetree'

class App extends Component {
    render() {

        const { message, setMessage, todos, addTodo, removeTodo } = this.props

        return (
            <div>
                <div>
                    <h1>{message}</h1>
                    <div>
                        Type message: <input type='text' value={message} onChange={evt => setMessage(evt.target.value)} />
                        <button type='button' onClick={() => addTodo(message)}>add to todo</button>
                    </div>
                </div>
                <ul>
                {
                    todos.map((t,i) => <li key={i}>{t} <button type='button' onClick={() => removeTodo(t)}>remove</button></li>)
                }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            message: state.message,
            todos: state.todos
        }
    },
    mutate => {
        return {
            setMessage: (msg) => mutate(state => {
                state.message = msg
            }),
            addTodo: (todo) => mutate(state => {
                state.todos.push(todo)
            }),
            removeTodo: (todo) => mutate(state => {
                const idx = state.todos.indexOf(todo)
                if (-1 < idx) {
                    state.todos.splice(idx, 1)
                }
            })
        }
    }
)(App)
```

## Example

[Sample Project](https://github.com/zplanet/pinetree-sample).

## API Reference

init(fn: state => void) : Initialize store state

```
import { init } from 'pinetree'

init(state => {
    state.<state variable> = <initial value>
})
```

mutate(fn: state => void) : Mutate store state

```
import { mutate } from 'pinetree'

mutate(state => {
    state.<state variable> = <value>
})
```

getState() : Return current state

```
import { getState } from 'pinetree'

const currentState = getState()
```

subscribe(fn: state => void) : Set callback function to listen state change

```
import { subscribe } from 'pinetree'

const unsubscribe = subscribe(state => {
    ...
})

...

unsubscribe() // unsubscribe the subscription
```

connect(filter: state => {}, mutator: mutate => {})(component: React.Component) : Connect Pinetree store to React component

```
import React, { Component } from 'react'
import { connect } from 'pinetree'

class MyComponent extends Component {
    ...
}

export connect(
    state => {
    	return {
            ...
        }
    },
    mutate => {
        return {
            ....
        }
    }
)(MyComponent)
```