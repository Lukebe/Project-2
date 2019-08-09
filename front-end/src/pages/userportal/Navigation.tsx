import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class LeftUserPortal extends Component <any, any>{

    render() {
        return(  
            <React.Fragment>
                <Navbar bg="light">
                    <Navbar.Brand>Kutsies</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link >Home</Nav.Link>
                        <Nav.Link >Search</Nav.Link>
                        <Nav.Link >My Jobs</Nav.Link>
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
