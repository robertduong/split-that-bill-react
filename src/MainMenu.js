import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import hostImage from './../public/images/host.png';
import joinImage from './../public/images/join.png';

const headerMessage = "GET STARTED";

const centerBlock = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}

const Selection = (props) =>
  <Link to={props.link}>
  <Col xs={6}>
    <div style={centerBlock}>
      <img className="img-responsive" alt={props.imageSrc} src={props.imageSrc}/>
      {props.name}
    </div>
  </Col>
  </Link>




const MainMenu = (props) =>
  <div className="vertical-center">
    <Grid>
      <Row className="show-grid">
        <Col xs={12}><div style={centerBlock}><h3>{headerMessage}</h3></div></Col>
      </Row>
      <Row>
        <Selection name="HOST" link="/host/create" imageSrc={hostImage}/>
        <Selection name="JOIN" link="/join/option" imageSrc={joinImage}/>
      </Row>
    </Grid>
  </div>


export default MainMenu;
