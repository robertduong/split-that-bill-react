import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './App';
import './index.css';

const config = {
  apiKey: "AIzaSyAn04oG-WxLMFRRx38rV58A6GEpSnYvBjg",
  authDomain: "split-that-bill-94a38.firebaseapp.com",
  databaseURL: "https://split-that-bill-94a38.firebaseio.com",
  projectId: "split-that-bill-94a38",
  storageBucket: "split-that-bill-94a38.appspot.com",
  messagingSenderId: "372760952070"
};

const fb = firebase.initializeApp(config).database().ref();

ReactDOM.render(
  <App fb={fb}/>,
  document.getElementById('root')
);
