import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, FormControl, FormGroup, Modal, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import QRImage from './../public/images/QR.png';
import SplitApi from './SplitApi';
import {firebaseAppAuth} from './ApiHelper';
import {login} from './actions';
import HostIcon from './../public/images/crown.svg';

const centerBlock = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  color: '#000'
}

const Header = (props) => 
<Grid>
      <Row className="header"> <div style={{paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem'}}>
        <Row>
          <Col xs={12}></Col>
        </Row>
        <Row>
          <Col xs={4} style={{textAlign: 'left'}}><Link to="/menu">{'\u2329'}</Link></Col>
          <Col xs={4} style={{textAlign: 'center'}}><h2>Hosting</h2></Col>
          {/*<Col xs={4} style={{textAlign: 'right'}}>+</Col>*/}
        </Row>
        <Row>
          <Col xs={6} style={{textAlign: 'right'}}><h2>{props.tabCodeMessage}</h2></Col>
          <Col xs={6} style={{textAlign: 'left'}}><h2>{props.tabCode}</h2></Col>
        </Row>
        <Row>
        </Row>
        <Row>
          {/*<Col xs={6} style={{textAlign: 'center'}}>Scan Receipt</Col>*/}
          <Col xs={12} style={{textAlign: 'center'}} onClick={props.onAddTotalClick}>Add Bill Total</Col>
        </Row>
        </div>
      </Row>
    </Grid>

const listNames = (users, hostId, hostIcon) => users.map((user, idx) => {
  if (user.uid === hostId) {
    console.log("User.uid"+user.uid);
    console.log("Host.uid"+hostId);
    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col xs={10}>{user.name}</Col>
            <Col xs={2}><img src={hostIcon} /></Col>
          </Row>
        </Grid>
      </ListGroupItem>
    );
  } else {
    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col xs={10}>{user.name}</Col>
            <Col xs={2}>PAID</Col>
          </Row>
        </Grid>
      </ListGroupItem>
    );
    }
  });

const Payments = (props) =>
  <ListGroup>
    {listNames(props.users, props.host.uid, props.hostIcon)}
  </ListGroup>

const AddTotalModal = (props) =>
  <Modal style={props.modalStyle} show={props.showTotalModal} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Enter total</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <FormGroup controlId="formBasicText">
          <FormControl type="number" autoFocus value={props.paymentAmount} onChange={props.onChange} placeholder={"$26"} />
        </FormGroup>
        <Button onClick={props.submit}>
          Set Total
        </Button>
      </form>
    </Modal.Body>
  </Modal>

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      setCode: false,
      tabCodeMessage: 'Generating...',
      host: this.getStoreState().user,
      showTotalModal: false,
      total: 0
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.addTotal = this.addTotal.bind(this);
    this.onTotalChange = this.onTotalChange.bind(this);

    firebaseAppAuth.onAuthStateChanged((user) => {
       this.props.route.store.dispatch(login(user));
       this.setState({host: this.getStoreState().user});
       this.forceUpdate();
       console.log("authed already...");
    });
 
    console.log("Host "+this.state.host);
    console.log(this.props.route.store.getState().user.displayName);
  }

  getStoreState() {
    return this.props.route.store.getState();
  }

  componentWillMount() {
    const tabCodeOrCreate = this.props.params.action || "create";
    console.log(tabCodeOrCreate);

    if (tabCodeOrCreate === "create") {
      if (!this.state.tabCode) {
        const createSessionPromise = SplitApi.generateSessionId();
        createSessionPromise.then((hashid) => {
          console.log("lets do stuff now with "+hashid);
          SplitApi.createSession(hashid, this.props.route.store.getState().user.uid);

          browserHistory.push('/host/'+hashid);

          this.setState({setCode: true, tabCode: hashid, tabCodeMessage: 'Tab Code'});

          SplitApi.getMembersOnChange(this.state.tabCode, members => {
            console.log("members: "+members);
            const memberNames = [];
            members.map(member => {
              console.log("fetching member "+member);
              SplitApi.getUser(member).then(user => {
                memberNames.push({uid: user.id, name: user.name});

                this.setState({members: memberNames});
              });
            });

          });
        });
      }
    } else {
    console.log("Tab Code already exists!");
    this.setState({tabCodeMessage: 'Tab Code'});
    SplitApi.getTotalOnChange(tabCodeOrCreate, (totalAmount) => {
      if (totalAmount) {
        this.setState({total: totalAmount});
      } else {
        this.setState({total: 0});
      }
    });

    SplitApi.getMembersOnChange(this.state.tabCode || tabCodeOrCreate, members => {
      const memberNames = [];
      members.map(member => {
        SplitApi.getUser(member).then(user => {
          memberNames.push({uid: user.id, name: user.name});
          this.setState({members: memberNames});
        });
      });
    })

      this.setState({tabCode: tabCodeOrCreate});
    }
    
    console.log(this.state.members);
    console.log(this.props.location);
    console.log(this.props);
    console.log(this.props.params);
  }

  onTotalChange(e) {
    this.setState({total: e.target.value});
  }

  addTotal() {
    SplitApi.setTotal(this.state.total, this.props.params.action).then(() => {
      console.log("set");
    });
    this.close();
  }

  close() {
    this.setState({showTotalModal: false});
  }

  open(e) {
    console.log("setting showTotalModal");
    this.setState({showTotalModal: true});
  }

  componentWillUnmount() {
    console.log("unmounting");
    SplitApi.stopGetMembers(this.state.tabCode|| this.props.params.action || "create"); 
    SplitApi.stopGetTotal(this.state.tabCode || this.props.param.action);
  }

  render() {
    return (
      <div className="host">
        <AddTotalModal paymentAmount={this.state.total} modalStyle={centerBlock} showTotalModal={this.state.showTotalModal} close={this.close} onChange={this.onTotalChange} submit={this.addTotal} />
        <Header onAddTotalClick={this.open} tabCodeMessage={this.state.tabCodeMessage} tabCode={this.state.tabCode}/>
        <Payments hostIcon={HostIcon} host={this.state.host} users={this.state.members}/>
        <div style={{textAlign: 'center'}}>Total: ${this.state.total}</div>
      </div>
    );
  }
}

export default Host;
