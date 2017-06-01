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
import {login} from './actions';


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
  constructor(props) {
    super(props);
 }

  componentWillMount() {
    console.log("mounted");
    firebaseAppAuth.onAuthStateChanged((user) => {
      this.props.route.store.dispatch(login(user));
    });
  }

  componentDidMount(){
    console.log(this.props.store);
    authConfig.callbacks.signInSuccess = (user, credential, redirectUrl) => {
      this.props.route.store.dispatch(login(user));
      SplitApi.createUser(user.uid, user.displayName, user.email);
      browserHistory.push('/menu');
      return false;
    };
    console.log(authConfig.callbacks.signInSuccess);
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
