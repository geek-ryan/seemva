import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/antd/dist/antd.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer);
// const data = store.getState();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
