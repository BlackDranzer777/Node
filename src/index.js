import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'   

import App from './App';
import billingItemsReducer from './store/reducers/billingItemsReducer'
import filteredItemsReducer from './store/reducers/filteredItemsReducer' 

const rootReducer = combineReducers({
  BIR: billingItemsReducer,
  FIR: filteredItemsReducer
});

// STORE -> Goobalized State
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />                   
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// we wrap our app component with provider to connect react with redux 
// provider is a helper component which allows us to inject our store into the react components

