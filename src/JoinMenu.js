import React from 'react';
import { browserHistory } from 'react-router';
import { Button, FormControl, FormGroup, Modal, Grid, Row, Col } from 'react-bootstrap';
//import hostImage from './../public/images/host.png';
import QRImage from './../public/images/QR.png';

const centerBlock = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}

const Selection = (props) =>
  <Col xs={6}>
    <div style={centerBlock} onClick={props.onClick}>
      <img className="img-responsive"  alt={props.imageSrc} src={props.imageSrc}/>
      {props.name}
    </div>
  </Col>


const modalStyle = {
  top: '40%',
  bottom: 0,
  left: 0,
  right: 0,
  position: 'fixed',
  color: '#000'
}

const availableTabCodes = ['1483', '1927', '4584']

class JoinMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      showTabCodeModal: false,
      tabCode: '',
      placeHolderCode: this.randomTab()
    };

    this.showTabCodeModal = this.showTabCodeModal.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.validateTabCode = this.validateTabCode.bind(this);
    this.updateTabCode = this.updateTabCode.bind(this);
    this.goToJoin = this.goToJoin.bind(this);
  }

  open(){
  this.setState(prevState => ({
      showTabCodeModal: true
    }));
  }

  close(){
  this.setState(prevState => ({
      showTabCodeModal: false
    }));
  }

  showTabCodeModal(e) {
    e.preventDefault();
    this.open();
  }

  validateTabCode() {
    if (availableTabCodes.includes(this.state.tabCode)) {
      console.log('success');
      return 'success';
    } else {
      return 'error';
    }
  }

  updateTabCode(e) {
    this.setState({tabCode: e.target.value });
  }

  randomTab() {
    return Math.floor(Math.random() * 10000);
  }

  goToJoin(e) {
    e.preventDefault();
    browserHistory.push('/join');
  }

  render() {
    return (
    <div className="vertical-center">
        <div className="tab-code-modal">
          <Modal style={modalStyle} show={this.state.showTabCodeModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Tab Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <FormGroup controlId="formBasicText" validationState={this.validateTabCode()}>
                <FormControl type="number" step="1" autofocus value={this.state.tabCode} placeholder={this.state.placeHolderCode} onChange={this.updateTabCode} />
                <FormControl.Feedback />
              </FormGroup>
              <Button onClick={this.goToJoin}>
                  OK
              </Button>
            </form>
            </Modal.Body>
          </Modal>
        </div> 
      <Grid>
        <Row className="show-grid">
          <Col xs={12}><div style={centerBlock}><h3>JOIN SESSION</h3></div></Col>
        </Row>
        <Row>
          <Selection name="QR" imageSrc={QRImage}/>
          <Selection name="Enter Tab Code" onClick={this.showTabCodeModal} imageSrc={QRImage}/>
        </Row>
      </Grid>
    </div>
    );
  }
}


export default JoinMenu;
