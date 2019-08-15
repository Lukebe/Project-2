import React, { Component } from 'react';
import * as APICall from '../../utils/APICall';
import {RequestState} from '../../utils/APICall';
import { Button, Form, Spinner, Modal, Alert } from "react-bootstrap";
import { IAuthState, IAppState, IAccountState } from '../../reducers';
import { startRedirect, finishRedirect } from '../../actions/Authentication.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './account.css';
import { openLogin, openForgetPassword, openSignup, closeModal } from '../../actions/AccountModal.action';
export interface IReduxProps {
    //data from state store
    auth: IAuthState,
    accountModal: IAccountState;
    //Action creators from the dispatcher
    openLogin: () => void;
    openForgotPassword: () => void;
    openSignup: () => void;
    closeModal: () => void;
    startRedirect: () => void;
    finishRedirect: () => void;
}
export interface IComponentProps {
    updateCallback : Function;
}

interface IState {
    validated: boolean;
    isValidationError: boolean;
    isRequestSuccessful: boolean;
    RequestStatus: {
        status: RequestState,
        errorMsg: string,

    }
    passwordsMatch: boolean;
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
type IProps = IComponentProps & IReduxProps;
export class Login extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            validated: false,
            isValidationError: false,
            isRequestSuccessful : false,
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            },
            passwordsMatch: true,
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleSubmit(event:any) {  
        this.setState({...this.state, 
            RequestStatus: {...this.state.RequestStatus, status: RequestState.NOT_ACTIVE}});
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false || this.state.password !== this.state.confirmPassword) {
            event.stopPropagation();
            this.setState({...this.state, validated: true, isValidationError: true});
            return;
        }
        this.handleRequest();
    }


    async handleUpdate(event:any) {
        await this.setState({...this.state,  [event.target.id]: event.target.value});
        let isValidationError : boolean = false;
        let passwordsMatch : boolean = true;
        if(this.state.validated){
            isValidationError = this.state.isValidationError === true ? false : false;
            passwordsMatch = this.state.password === this.state.confirmPassword ? true : false;
        }
        this.setState({...this.state, isValidationError, passwordsMatch});
    }
    handleClose = () => {   
        this.props.updateCallback();
    }
    async handleRequest() {
        this.setState({...this.state, RequestStatus :
             {...this.state.RequestStatus, status: RequestState.FETCHING}});
        const response = await APICall.POST('/users', {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            rating: 0
        });
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        if(await response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus,
                    status: RequestState.ERROR,
                    errorMsg: response.message}});

        } else {
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus,
                    status: RequestState.SUCCESSFUL}});
        }
        console.log(await response);
    }

    render() {
        return (

            <Modal show={true} onHide={() => {this.handleClose()}}
                dialogClassName="login-modal"
                animation = {false} backdrop backdropClassName = "login-modal-backdrop" centered keyboard
                size = "lg">
                <Modal.Header closeLabel = "Close">  <i onClick = {this.props.openLogin} className="large material-icons">arrow_back</i>
                <h2> Register </h2>  <i className="large material-icons" onClick = {this.handleClose}>close</i>
                </Modal.Header>
                {this.props.auth.redirect.readyToRedirect ? 
                    <Redirect to = {this.props.auth.redirect.route}/>
                 : null}
                 <Modal.Body>
                 {this.state.isValidationError ?
                    <Alert key="validation-error" variant="danger">
                    There were errors in your submission
                    </Alert> : null }
                {this.state.RequestStatus.status === RequestState.ERROR ?
                    <Alert key="request-error" variant="danger">
                    {this.state.RequestStatus.errorMsg}
                    </Alert> : null }
                {this.state.RequestStatus.status === RequestState.SUCCESSFUL ?
                    <Alert key="request-success" variant="success">
                    Your account has been registered. Please go to the login page
                    and login with your specified credentials.
                    </Alert> : null }
                <Form noValidate validated={this.state.validated}
                className = 'login-form' onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Control 
                            required
                            autoFocus
                            size = "lg"
                            type="text" 
                            placeholder="Username" 
                            minLength = {6}
                            maxLength = {30}
                            value={this.state.username}
                            onChange={this.handleUpdate}/>
                        <Form.Control.Feedback type="invalid">
                            Username must be between 6 and 30 characters
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Control 
                            required
                            size = "lg"
                            type="text" 
                            maxLength = {30}
                            placeholder="First Name" 
                            value={this.state.firstName}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Control 
                            required
                            size = "lg"
                            type="text"
                            maxLength = {30} 
                            placeholder="Last Name" 
                            value={this.state.lastName}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control 
                            required
                            size = "lg"
                            type="email" 
                            placeholder="Email Address" 
                            value={this.state.email}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Control 
                            required
                            size = "lg"
                            type="phone"
                            maxLength = {30} 
                            placeholder="Phone Number" 
                            value={this.state.phone}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control 
                            required
                            type="password" 
                            size = "lg"
                            minLength = {6}
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handleUpdate}/>
                        <Form.Control.Feedback type = "invalid">
                            Passwords must be greater than 6 characters
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Control 
                            type="password" 
                            size = "lg"
                            minLength = {6}
                            placeholder="Confirm Password" 
                            isInvalid = {!this.state.passwordsMatch}
                            value={this.state.confirmPassword}
                            onChange={this.handleUpdate}/>
                        <Form.Control.Feedback type = "invalid">
                            Passwords do not match
                        </Form.Control.Feedback>
                        <Form.Text className = 'text-muted'>
                            Please choose a secure password.
                        </Form.Text>
                    </Form.Group>
                    <Button
                            type="submit"
                            size="lg"
                            disabled = {this.state.RequestStatus.status === RequestState.FETCHING}
                            block
                            className = "landing-button modal-form-button">

                        Sign up 
                        {this.state.RequestStatus.status === RequestState.FETCHING  ?
                         <Spinner className = "modal-form-spinner"
                        animation = "border" variant = "light"/> : null}
                    </Button>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
        )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth,
        accountModal: state.accountModal,
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    openLogin: openLogin,
    openSignup: openSignup,
    closeModal: closeModal,
    openForgotPassword: openForgetPassword,
    startRedirect: startRedirect,
    finishRedirect: finishRedirect,

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);