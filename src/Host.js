import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import QRImage from './../public/images/QR.png';
import SplitApi from './SplitApi';
import {firebaseAppAuth} from './ApiHelper';
import {login} from './actions';

const Header = (props) => 
<Grid>
      <Row className="header">
        <div style={{paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem'}}>
        <Row>
          <Col xs={12}></Col>
        </Row>
        <Row>
          <Col xs={4} style={{textAlign: 'left'}}><Link to="/">{'\u2329'}</Link></Col>
          <Col xs={4} style={{textAlign: 'center'}}><h2>Hosting</h2></Col>
          <Col xs={4} style={{textAlign: 'right'}}>+</Col>
        </Row>
        <Row>
          <Col xs={6} style={{textAlign: 'right'}}><h2>{props.tabCodeMessage}</h2></Col>
          <Col xs={6} style={{textAlign: 'left'}}><h2>{props.tabCode}</h2></Col>
        </Row>
        <Row>
        </Row>
        <Row>
          {/*<Col xs={6} style={{textAlign: 'center'}}>Scan Receipt</Col>*/}
          <Col xs={12} style={{textAlign: 'center'}}>Add Bill Total</Col>
        </Row>
        </div>
      </Row>
    </Grid>

const listNames = (names) => names.map((name, idx) => {
  if (idx === 1) {
    return <ListGroupItem active>{name}</ListGroupItem>;
  } else {
    return <ListGroupItem onClick={console.log("asd")}>{name}</ListGroupItem>;
    }
  });

const Payments = (props) =>
  <ListGroup>
    {listNames(props.names)}
    {console.log(props.names)}
  </ListGroup>

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      setCode: false,
      tabCodeMessage: 'Generating...'
    }

     firebaseAppAuth.onAuthStateChanged((user) => {
       this.props.route.store.dispatch(login(user));
       console.log(this.getStoreState().user.displayName);
       this.forceUpdate();
       console.log("authed already...");
    });
 
    console.log(this.props.route.store.getState().user.displayName);
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
          this.setState({setCode: true, tabCode: hashid, tabCodeMessage: 'Tab Code'});

          SplitApi.getMembersOnChange(this.state.tabCode, members => {
            console.log("members: "+members);
            const memberNames = [];
            members.map(member => {
              console.log("fetching member "+member);
              SplitApi.getUser(member).then(user => {
                memberNames.push(user.name);

                this.setState({members: memberNames});
              });
            });

          });
        });
      }
    } else {
    console.log("Tab Code already exists!");
    this.setState({tabCodeMessage: 'Tab Code'});
    SplitApi.getMembersOnChange(this.state.tabCode || tabCodeOrCreate, members => {
      const memberNames = [];
      members.map(member => {
        SplitApi.getUser(member).then(user => {
          memberNames.push(user.name);
          this.setState({members: memberNames});
        });
      });
    });

      this.setState({tabCode: tabCodeOrCreate});
    }
    
    console.log(this.state.members);
    console.log(this.props.location);
    console.log(this.props);
    console.log(this.props.params);
  }

  render() {
    return (
      <div className="host">
        <Header tabCodeMessage={this.state.tabCodeMessage} tabCode={this.state.tabCode}/>
        <Payments names={this.state.members}/>
      </div>
    );
  }
}

export default Host;
