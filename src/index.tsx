import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import { configureStore } from './store';
import { Provider } from 'mobx-react';
// import './index.css'

function startApp() {
    const placeholder = document.getElementById('feed-app')
    if (!placeholder) {
        return
    }
    const container = document.createElement('div')
    container.classList.add('root-container')
    placeholder.parentNode!.replaceChild(container, placeholder)

    configureStore().then(store => {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            container
        )
    })
}

if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', startApp)
} else {
    // `DOMContentLoaded` has already fired
    startApp()
}
