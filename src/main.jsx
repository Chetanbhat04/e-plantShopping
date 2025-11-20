import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import Redux Provider
import { Provider } from 'react-redux'

// Import the store
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
