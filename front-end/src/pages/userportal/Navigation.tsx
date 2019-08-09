import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class LeftUserPortal extends Component <any, any>{

    render() {
        return(  
            <React.Fragment>
                <Navbar bg="light">
                    <Navbar.Brand>Kutsies</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={ Link } to="/">Home</Nav.Link>
                        <Nav.Link as={ Link } to="/userportal/search">Search</Nav.Link>
                        <Nav.Link as={ Link } to="/userportal/myjobs">My Jobs</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        Signed in as: <a >Current User</a>
                        </Navbar.Text>
                    </Navbar.Collapse>    
                </Navbar>
            </React.Fragment>
        );
    } 
}
