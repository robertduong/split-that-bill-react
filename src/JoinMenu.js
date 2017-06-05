import React from 'react';
import { browserHistory } from 'react-router';
import { Button, FormControl, FormGroup, Modal, Col } from 'react-bootstrap';

const centerBlock = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}

const Selection = (props) =>
  <Col xs={12}>
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
  constructor(props) {
    super(props);
    this.state = {
      showTabCodeModal: this.props.showModal,
      tabCode: '',
      placeHolderCode: this.randomTab()
    };

    this.showTabCodeModal = this.showTabCodeModal.bind(this);
    this.validateTabCode = this.validateTabCode.bind(this);
    this.updateTabCode = this.updateTabCode.bind(this);
    this.goToJoin = this.goToJoin.bind(this);
  }

    /*open(){
  this.setState(prevState => ({
      showTabCodeModal: true
    }));
  }*/

    /*close(){
  this.setState(prevState => ({
      showTabCodeModal: false
    }));
  }*/

  showTabCodeModal(e) {
    e.preventDefault();
    this.props.open();
  }

  validateTabCode() {
    if (availableTabCodes.includes(this.state.tabCode.toLowerCase())) {
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
          <Modal style={modalStyle} show={this.props.showModal} onHide={this.props.close}>
          {console.log(this.props.showModal)}
            <Modal.Header closeButton>
              <Modal.Title>Enter Tab Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <FormGroup controlId="formBasicText">
                <FormControl type="string" step="1" autoFocus value={this.props.value} placeholder={this.state.placeHolderCode} onChange={this.props.updateValue} />
                <FormControl.Feedback />
              </FormGroup>
              <Button onClick={this.props.confirm}>
                Join
              </Button>
            </form>
            </Modal.Body>
          </Modal>
    );
  }
}


export default JoinMenu;
