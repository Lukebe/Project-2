import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';


export default class LeftUserPortal extends Component<any, any>{

    render() {
        return (
            <React.Fragment>
                <Navbar bg="light">
                    <Nav className="mr-auto">
                        <Nav.Link as={ Link } to="/">Home</Nav.Link>
                        <NavDropdown title="My Jobs" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to="/userportal/myjobs">All Jobs</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/userportal/byStatus">ByStatus</NavDropdown.Item>  
                        </NavDropdown>
                        <NavDropdown title="Search Jobs" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to="/userportal/search/category">By Category</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">other</NavDropdown.Item>  
                        </NavDropdown>
                    </Nav>  
                </Navbar> 
            </React.Fragment>
        );
    }
}
