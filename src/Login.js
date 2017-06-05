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

const convertFirebaseUsertoStore = (firebaseUser) => {
  return {
    displayName: firebaseUser.displayName,
    uid: firebaseUser.uid,
    email: firebaseUser.email
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    firebaseAppAuth.onAuthStateChanged((firebaseUser) => {
      const storeUser = convertFirebaseUsertoStore(firebaseUser);
      this.props.route.store.dispatch(login(storeUser));
      browserHistory.push('/menu');
    });
  }

  componentWillMount() {
    console.log("mounted");
  }

  componentDidMount(){
    console.log(this.props.store);
    authConfig.callbacks.signInSuccess = (firebaseUser, credential, redirectUrl) => {
      const storeUser = convertFirebaseUsertoStore(firebaseUser);

      this.props.route.store.dispatch(login(storeUser));
      SplitApi.createUser(storeUser.uid, storeUser.displayName, storeUser.email);
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
