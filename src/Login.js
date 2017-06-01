import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import hostImage from './../public/images/host.png';
import joinImage from './../public/images/join.png';
import JoinMenu from './JoinMenu';
import SplitApi from './SplitApi';
import {firebaseAuthUI as firebaseAuth} from './ApiHelper';
import {authConfig} from './ApiHelper';
import {firebaseAppAuth} from './ApiHelper';

const headerMessage = "GET STARTED";

const centerBlock = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}

const centerModal = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  color: '#000'
}

class Login extends React.Component {
  constructor() {
    super();
 }

  componentWillMount() {
    console.log("mounted");
    firebaseAppAuth.onAuthStateChanged((user) => {
      console.log(user);
      //browserHistory.push('/menu');
    });
  }

  componentDidMount(){
    console.log(authConfig);
    firebaseAuth.start('#auth-area', authConfig);
  }

  render() {
    return (
      <div>
        <div id="auth-area"></div>
      </div>
    );
  }
}


export default Login;
