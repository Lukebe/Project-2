import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Navigation extends Component <any, any>{
 
    render() {
        return(  
            <React.Fragment>
                <Navbar bg="light">
                    <Nav className="mr-auto">
                        <Nav.Link as={ Link } to="/">Home</Nav.Link>
                        <Nav.Link as={ Link } to="/userportal/myjobs">My Jobs</Nav.Link>
                        <NavDropdown title="Search Jobs" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to="/userportal/search/category">By Category</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">By Status</NavDropdown.Item>  
                        </NavDropdown>
                    </Nav>  
                </Navbar>
            </React.Fragment>
        );
    } 
}
