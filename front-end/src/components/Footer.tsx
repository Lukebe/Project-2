import React from 'react';
import '../App.css';
import { Row, Col, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className='main-footer'>
      <Row className='footer-nav'>
        <Col sm={12} md={12} lg={12} xl={3}>
          <Navbar.Brand className="Logo" href="#/">Kutsies</Navbar.Brand>
        </Col>
        <Col sm={12} md={8} lg={7} xl={6}>
          <Navbar className='nav-black'>
            <Nav className="">
              <Link to="/">Home</Link>
              <Link to="/">About Us</Link>
              <Link to="/">Contact Us</Link>
              <Link to="/">Legal</Link>
              <Link to="/">Privacy Policy</Link>
            </Nav>
          </Navbar>
        </Col>
        <Col sm={12} md={4} lg={5} xl={3}>
          <i className="material-icons small">business</i><p className="address">123 Company Drive<br />Tampa, FL 33801</p>
          <i className="material-icons small">phone</i><p className="phone-number"><a href="tel:1234567890">(123)-456-7890</a></p>
        </Col>
      </Row>
    </footer>
  );
}

export { Footer };
