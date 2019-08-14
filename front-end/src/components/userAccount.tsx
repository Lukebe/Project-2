import React, { Component } from 'react';
//Import interfaces from reducers
import { IAppState, IAuthState } from '../reducers';
//Import action creators you want to reference
import {
    loginSuccessful, toggleAuthStatus,
    authTimerTick
} from '../actions/Authentication.action';
//Import connect function from redux, this connects global store to component.
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import './userAccount.css';
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
    state: IState = {
    }
    render() {
        return (
            <>
                {//Returns email from auth.userProfile in redux state
                }
                <p>{this.props.auth.userProfile.getEmail}</p>
                <div className="userAccountDiv">
                    <h1 className="useraccountHeading">User Account Information</h1>
                    <Form className="userAccountForm">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Label>{this.props.auth.userProfile.getEmail}</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>


                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="First Name" />
                        </Form.Group>


                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="password" placeholder="Last Name" />
                        </Form.Group>


                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" placeholder="Phone Number" />
                        </Form.Group>




                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </Form>
                </div>


            </>
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