import React, { Component } from 'react';
import * as APICall from '../utils/APICall';
import { Button, Form } from "react-bootstrap";
import { IAuthState, IAppState } from '../reducers';
import { startRedirect, finishRedirect } from '../actions/Authentication.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    startRedirect: () => void;
    finishRedirect: () => void;
}
export class Login extends Component <IAuthProps,any>{

    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleSubmit(event:any) {  
        event.preventDefault();
        this.handleRequest();
    }


    handleUpdate(event:any) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    async handleRequest() {
        const response = await APICall.POST('/login', {
            username: this.state.username,
            password: this.state.password
        });
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        const message = await response instanceof Error ? response.message : response;
        alert(message);
        const data = await response
        this.props.startRedirect();
        this.props.finishRedirect();
        //if(response instanceof Error){
        //    alert(response.message);
        //} else {
        //    alert(response);
        //}
    }

    render() {
        return (
            <div className="Login">
                {this.props.auth.redirect.readyToRedirect ? 
                    <Redirect to = {this.props.auth.redirect.route}/>
                 : null}
                <h2>Login</h2>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            required
                            autoFocus
                            type="text" 
                            placeholder="Enter username" 
                            value={this.state.username}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Button variant="primary" 
                            type="submit"
                            size="lg" 
                            block>
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    startRedirect: startRedirect,
    finishRedirect: finishRedirect,

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);