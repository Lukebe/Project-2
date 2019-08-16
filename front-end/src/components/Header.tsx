import React, { Component } from 'react';
import '../App.css';
import { Row, Col, Nav, Navbar, FormControl, Button, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { loginSuccessful } from '../actions/Authentication.action';
import { IAuthState, IAppState } from '../reducers';
import { connect } from 'react-redux';
import { render } from 'react-dom';




type IProps = IComponentProps & IAuthProps;

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful: () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {

}

//Header with class format for Nav bar
class Header extends Component<IAuthProps, IState>{
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }

}



const mapStateToProps = (state: IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful: loginSuccessful,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);