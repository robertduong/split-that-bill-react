import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './App';
import './index.css';
import './firebase-ui.css';
import { createStore } from 'redux';
import login from './reducers';
  


let store = createStore(login);
ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
