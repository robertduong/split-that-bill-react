import React from 'react';
import { Link } from 'react-router';
import { Button, FormControl, FormGroup, Modal, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import QRImage from './../public/images/QR.png';
import SplitApi from './SplitApi';

const listNames = (members, host) => members.map((member, idx) => {
  if (member.id === host.id) {
    return <ListGroupItem active>{member.name}</ListGroupItem>;
  } else {
    return <ListGroupItem onClick={console.log("asd")}>{member.name}</ListGroupItem>;
    }
  });

const Payments = (props) => <ListGroup>{listNames(props.members, props.host)}</ListGroup>

const centerBlock = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  color: '#000'
}

const ShowModal = (props) => 
  <Modal style={props.modalStyle} show={props.showModal} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Pay {props.host}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <FormGroup controlId="formBasicText">
          <FormControl type="number" autoFocus value={props.paymentAmount} onChange={props.onChange} placeholder={"$26"} />
        </FormGroup>
        <Button onClick={props.pay}>
          Pay
        </Button>
      </form>
    </Modal.Body>
  </Modal>

const PaymentConfirmModal = (props) =>
  <Modal style={centerBlock} show={props.showModal} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Payment Confirmed</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>You have paid {props.host} ${props.amount}</p>
    <Button onClick={props.close}>
      OK
    </Button>
    </Modal.Body>
  </Modal>


class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      host: {id: "", name: ""},
      showModal: false,
      showPaymentConfirmModal: false,
      amount: 0
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.pay = this.pay.bind(this);
    this.onPaymentConfirmClose = this.onPaymentConfirmClose.bind(this);
    this.onPaymentChange = this.onPaymentChange.bind(this);
  }

  componentWillMount() {

    const tabCode = this.props.params.tabCode || "123";
    // if tabCode is null, redirect out
    //

    SplitApi.getHost(tabCode).then(host => {
      return SplitApi.getUser(host)
    }).then(userDetails => {
      this.setState({host: userDetails});
    });

    SplitApi.getMembersOnChange(tabCode, members => {
      console.log("Fetching members...");
      
      const foundSelf = members.reduce((found, member) => {
        return member === "1";
      }, false);

      if (!foundSelf) {
        SplitApi.addUserToSession("1", tabCode);
      }

      const memberNames = []; members.map(member => {
        SplitApi.getUser(member).then(user => {
          memberNames.push(user);
          this.setState({members: memberNames});
        });
      });

    });

    //get list of members
    //check if current user is there
    //if not, add to list
    //get members
    //set members in state
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  pay() {
    this.close();
    this.setState({showPaymentConfirmModal: true});
  }

  onPaymentChange(e) {
    this.setState({amount: e.target.value});
  }

  onPaymentConfirmClose() {
    this.setState({showPaymentConfirmModal: false});
  }

  render() {
    return (
      <div className="host">
        <ShowModal modalStyle={centerBlock} showModal={this.state.showModal} close={this.close} host={this.state.host.name} pay={this.pay} onChange={this.onPaymentChange}/>
        <PaymentConfirmModal showModal={this.state.showPaymentConfirmModal} close={this.onPaymentConfirmClose} amount={this.state.amount} host={this.state.host.name} />

        <Grid>
          <Row className="header">
            <div style={{paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem'}}>
            <Row>
              <Col xs={12}></Col>
            </Row>
            <Row>
              <Col xs={4} style={{textAlign: 'left'}}><Link to="/">{'\u2329'}</Link></Col>
              <Col xs={4} style={{textAlign: 'center'}}><h2>Join</h2></Col>
              <Col xs={4} style={{textAlign: 'right'}}>+</Col>
            </Row>
            <Row>
              <Col xs={6} style={{textAlign: 'right'}}><h2>Tab Code</h2></Col>
              <Col xs={6} style={{textAlign: 'left'}}><h2>{this.props.params.tabCode}</h2></Col>
            </Row>
            <Row>
              <Col xs={12} style={{textAlign: 'left'}}><img className="img-responsive center-block" style={{width: '40%'}} src={QRImage} /></Col>
            </Row>
            <Row>
              <Col xs={12} style={{textAlign: 'center'}} onClick={this.open}>Pay {this.state.host.name}</Col>
            </Row>
            </div>
          </Row>
        </Grid>
        <Payments host={this.state.host} members={this.state.members}/>
      </div>
    );
  }
}

export default Join;
