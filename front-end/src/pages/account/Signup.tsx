import React, { Component } from 'react';
import * as APICall from '../../utils/APICall';
import { Button, Form, Spinner, Modal } from "react-bootstrap";
import { IAuthState, IAppState, IAccountState } from '../../reducers';
import { startRedirect, finishRedirect } from '../../actions/Authentication.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './account.css';
import { openLogin, openForgetPassword, openSignup } from '../../actions/AccountModal.action';
export interface IReduxProps {
    //data from state store
    auth: IAuthState,
    accountModal: IAccountState;
    //Action creators from the dispatcher
    openLogin: () => void;
    openForgotPassword: () => void;
    openSignup: () => void;
    startRedirect: () => void;
    finishRedirect: () => void;
}
export interface IComponentProps {
    updateCallback : Function;
}
interface IState {
    isFetching : boolean;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}
type IProps = IComponentProps & IReduxProps;
export class Login extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
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
        this.setState({...this.state,
            [event.target.id]: event.target.value
        });
    }
    handleClose = () => {
        this.props.updateCallback();
    }
    async handleRequest() {
        this.setState({...this.state, isFetching: true});
        const response = await APICall.POST('/login', {
            username: this.state.username,
            password: this.state.password
        });
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        const message = await response instanceof Error ? response.message : response;
        const setTheState = await response ? this.setState({...this.state, isFetching: false}) : null;
        alert(message);
        const data = await response;
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
                <Form className = 'login-form' onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Control 
                            required
                            autoFocus
                            size = "lg"
                            type="text" 
                            placeholder="Username" 
                            value={this.state.firstName}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Control 
                            required
                            autoFocus
                            size = "lg"
                            type="text" 
                            placeholder="First Name" 
                            value={this.state.firstName}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Control 
                            required
                            autoFocus
                            size = "lg"
                            type="text" 
                            placeholder="Last Name" 
                            value={this.state.lastName}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control 
                            required
                            autoFocus
                            size = "lg"
                            type="email" 
                            placeholder="Email Address" 
                            value={this.state.email}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control 
                            required
                            type="password" 
                            size = "lg"
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button
                            type="submit"
                            size="lg"
                            block
                            className = "landing-button modal-form-button"
                            onClick = {this.handleSubmit}>
                        Submit {this.state.isFetching  ? <Spinner className = "modal-form-spinner"
                        animation = "border" variant = "light"/> : null}
                    </Button>
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
    openForgotPassword: openForgetPassword,
    startRedirect: startRedirect,
    finishRedirect: finishRedirect,

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);