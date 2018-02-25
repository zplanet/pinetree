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
                    todos.map((t,i) => <li key={i}>{t} <button type='' onClick={() => removeTodo(t)}>remove</button></li>)
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

Please, refer the sample project [here](https://github.com/zplanet/pinetree-sample).
