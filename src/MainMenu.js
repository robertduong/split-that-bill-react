import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import hostImage from './../public/images/host.png';
import joinImage from './../public/images/join.png';
import JoinMenu from './JoinMenu';
import SplitApi from './SplitApi';
import {firebaseAuth} from './ApiHelper';
import {firebaseAppAuth} from './ApiHelper';
import {authConfig} from './ApiHelper';
import * as firebase from 'firebase';
import {login, logout} from './actions';

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
const Selection = (props) =>
  <Link to={props.link}>
  <Col xs={6}>
    <div style={centerBlock} onClick={props.onClick}>
      <img className="img-responsive" alt={props.imageSrc} src={props.imageSrc}/>
      {props.name}
    </div>
  </Col>
  </Link>

const TabCodeInvalidModal = (props) =>
  <Modal style={centerModal} show={props.showErrorModal} onHide={props.close}>
    <Modal.Body>
      <p>Tab Code is invalid</p>
    <Button onClick={props.close}>
      OK
    </Button>
    </Modal.Body>
  </Modal>


class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tabCode: '',
      showErrorModal: false,
      invalidTabCode: false,
      loadingValidation: false,
  }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateTabCode = this.validateTabCode.bind(this);
    this.updateTabCode = this.updateTabCode.bind(this);
    this.goToJoin = this.goToJoin.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.signOut = this.signOut.bind(this);

   console.log(this.props.route.store.getState());
  }

  componentWillMount() {
   firebaseAppAuth.onAuthStateChanged((user) => {
       if (user) {
         console.log("authed already...");
         this.props.route.store.dispatch(login(user));
       } else {
         console.log('logged out');
         this.props.route.store.dispatch(logout()); 
         browserHistory.push('/');
       }
    });
  }

  signOut(e) {
    e.preventDefault();
    firebaseAppAuth.signOut().then(() => {
      //browserHistory.push('/');
    });
  }

  openModal(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  closeModal(e) {
    this.setState({showModal: false});
  }

  validateTabCode() {
    return 'error';
  }

  updateTabCode(e) {
    this.setState({tabCode: e.target.value });
  }

  getStoreState() {
    return this.props.route.store.getState();
  }

  goToJoin() {
    const tabCode = this.state.tabCode.toLowerCase();
    SplitApi.getSession(tabCode).then((val) => {
      if (!val) {
        this.setState({invalidTabCode: true, showErrorModal: true, showModal: false});
      } else {
        //if the user is the host
        if (val.host === this.getStoreState().user.uid) {
          browserHistory.push('/host/'+tabCode);
        } else {
          browserHistory.push('/join/'+tabCode);
        }
      }
    });
  }

  closeErrorModal(e) {
    console.log("closing...");
    this.setState({showErrorModal: false});
  }

  render() {
    return (
      <div>
        {/*<a onClick={this.signOut}>Sign Out</a>*/}
      <div className="vertical-center">
        <JoinMenu close={this.closeModal} value={this.state.tabCode} updateValue={this.updateTabCode} open={this.openModal} confirm={this.goToJoin} validate={this.validateTabCode} showModal={this.state.showModal}/>
        <TabCodeInvalidModal showErrorModal={this.state.showErrorModal} close={this.closeErrorModal} tabCode={this.state.tabCode}/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12}><div style={centerBlock}><h3>Welcome {this.getStoreState().user.displayName}</h3></div></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}><div style={centerBlock}><h3>{headerMessage}</h3></div></Col>
          </Row>
          <Row>
            <Selection name="HOST" link="/host/create" imageSrc={hostImage}/>
            <Selection name="JOIN"  onClick={this.openModal} imageSrc={joinImage}/>
          </Row>
        </Grid>
      </div>
    </div>
    );
  }
}


export default MainMenu;
