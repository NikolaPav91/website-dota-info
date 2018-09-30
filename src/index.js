import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ,
   document.getElementById('root'));
registerServiceWorker();
