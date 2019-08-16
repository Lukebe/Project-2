import React, { Component, unstable_Profiler } from 'react';
//Import interfaces from reducers
import { IAppState, IAuthState } from '../reducers';
//Import action creators you want to reference
import {
    loginSuccessful, toggleAuthStatus,
    authTimerTick
} from '../actions/Authentication.action';
//Import connect function from redux, this connects global store to component.
import { connect } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import './userAccount.css';
import Profile from '../resources/images/profile.jpg';
import { ListGroup } from 'react-bootstrap';
//'./components/userAccount';




interface IState {
}
//Props interface for component. Defines the variables you want from the global store to be accessed via this.props
//At least one interface is necessary to implement redux.
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher

}
export class UserAccount extends Component<IAuthProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userName: "tampastudent",
            password: "revature",
            phone: "813-555-1212",
            firstName: "Katie",
            lastName: "Class",
            rating: .80



        }
    }

    render() {
        return (

            <div className="userAccountContainer">
                <h1 className="useraccountHeading">User Account Information</h1>
                <div className="userAccountContainerCard">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={Profile} />
                        <Card.Body>
                            <Card.Title>"Hello First Name"</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>First Last Name</ListGroup.Item>

                                <ListGroup.Item>Phone Number</ListGroup.Item>
                                <ListGroup.Item>Email</ListGroup.Item>
                                <ListGroup.Item>Rating</ListGroup.Item>
                            </ListGroup>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        );
    }
}
/**
* * The following three blocks of code are absolutely necessary to include redux in a component
*/
//This maps global state to props
const mapStateToProps = (state: IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful: loginSuccessful,
    toggleAuthStatus: toggleAuthStatus,
    authTimerTick: authTimerTick,
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);