import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import QRImage from './../public/images/QR.png';

const listNames = (members) => members.map((member, idx) => {
  if (member.id === "0") {
    return <ListGroupItem active>{member.name}</ListGroupItem>;
  } else {
    return <ListGroupItem onClick={console.log("asd")}>{member.name}</ListGroupItem>;
    }
  });

const Payments = (props) => <ListGroup>{listNames(props.members)}</ListGroup>

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentWillMount() {
    const tabCode = this.props.params.tabCode || "123";
    this.props.route.firebase.ref('/members/'+tabCode).on('value', (snapshot) => {
      console.log("Fetching members...");
      // if snpashot.val is null, redirect out
      const membersEntries = Object.entries(snapshot.val());
      const foundSelf = membersEntries.reduce( (found, member) => {
        return member[1] === "0";
      }, false);

      const updateMembers = [];
      this.setState({members: []});
      console.log("Clearing membmers...");
      console.log(this.state.members);
      console.log("--- Start adding members ---");
      membersEntries.map(memberEntry => {
        this.props.route.firebase.ref('/users/'+memberEntry[1]).once('value').then(snapshot => {
          this.state.members.push({id: memberEntry[1], name: snapshot.val().name});
          this.setState({members: this.state.members});
          console.log("Add member");
          console.log(this.state.members);
        });
      });

    });
    //get list of members
    //check if current user is there
    //if not, add to list
    //get members
    //set members in state
  }

  render() {
    return (
      <div className="host">
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
              <Col xs={6} style={{textAlign: 'center'}}>Scan Receipt</Col>
              <Col xs={6} style={{textAlign: 'center'}}>Add Total</Col>
            </Row>
            </div>
          </Row>
        </Grid>
        <Payments members={this.state.members}/>
      </div>
    );
  }
}

export default Join;
