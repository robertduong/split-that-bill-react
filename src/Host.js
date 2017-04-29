import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import QRImage from './../public/images/QR.png';

const tabCode = 123456;

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
          <Col xs={6} style={{textAlign: 'right'}}><h2>Tab Code</h2></Col>
          <Col xs={6} style={{textAlign: 'left'}}><h2>{tabCode}</h2></Col>
        </Row>
        <Row>
          <Col xs={12} style={{textAlign: 'left'}}><img alt={QRImage} className="img-responsive center-block" style={{width: '40%'}} src={QRImage} /></Col>
        </Row>
        <Row>
          <Col xs={6} style={{textAlign: 'center'}}>Scan Receipt</Col>
          <Col xs={6} style={{textAlign: 'center'}}>Add Total</Col>
        </Row>
        </div>
      </Row>
    </Grid>

const names = ["Robert", "Eric", "Alex", "Chesca", "Renee"];

const n =['MARY',
'PATRICIA',
'LINDA',
'BARBARA',
'ELIZABETH',
'JENNIFER',
'MARIA',
'SUSAN',
'MARGARET',
'DOROTHY',
'LISA',
'NANCY',
'KAREN',
'BETTY',
'HELEN',
'SANDRA',
'DONNA',
'CAROL',
'RUTH',
'SHARON',
'MICHELLE',
'LAURA',
'SARAH',
'KIMBERLY',
'DEBORAH',
'JESSICA'];

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
  </ListGroup>

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    }
  }

  componentWillMount() {
    this.props.route.firebase.ref('members/123456').on('value', (snapshot) => {
      console.log('Firebase update!');
      snapshot.val().map((v) => console.log(v));
      this.setState({members: snapshot.val()});
     });

    console.log(this.state.members);
    console.log(this.props.location);
    console.log(this.props);
    console.log(this.props.params);
  }

  render() {
    return (
      <div className="host">
        <Header />
        <Payments names={this.state.members}/>
      </div>
    );
  }
}

export default Host;
