import React, { Component } from 'react';
import * as APICall from '../../utils/APICall';
import { Button, Form, Spinner, Modal, Alert } from "react-bootstrap";
import { IAuthState, IAppState, IAccountState } from '../../reducers';
import { startRedirect, finishRedirect } from '../../actions/Authentication.action';
import { connect } from 'react-redux';
import './account.css';
import { openForgetPassword, openLogin, openSignup } from '../../actions/AccountModal.action';
export interface IReduxProps {
    //data from state store
    auth: IAuthState;
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
    emailAddress : string;
    validated : boolean;
    isValidationError : boolean;
}
type IProps = IComponentProps & IReduxProps;
export class Login extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            emailAddress: '',
            validated: false,
            isValidationError: false,
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleSubmit(event:any) {  
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
            this.setState({...this.state, validated: true, isValidationError: true});
            return;
        }
        this.handleRequest();
    }


    handleUpdate(event:any) {
        this.state.isValidationError ?
        this.setState({...this.state, isValidationError: false, [event.target.id]: event.target.value})
        : this.setState({...this.state, [event.target.id]: event.target.value});
    }
    handleClose = () => {
        this.props.updateCallback();
    }
    async handleRequest() {
        this.setState({...this.state, isFetching: true});
        const response = await APICall.POST('/login', {
            email: this.state.emailAddress
        });
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        const message = await response instanceof Error ? response.message : response;
        const setTheState = await response ? this.setState({...this.state, isFetching: false}) : null;
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

            <Modal show={true} onHide={() => {this.handleClose()}}
                dialogClassName="login-modal" backdrop backdropClassName = "login-modal-backdrop"
                animation = {false} centered keyboard
                size = "lg">
                <Modal.Header closeLabel = "Close">  <i onClick = {this.props.openLogin} className="large material-icons">arrow_back</i>
                <h2> Forgot Password </h2>  <i className="large material-icons" onClick = {this.handleClose}>close</i>
                </Modal.Header>
                <Modal.Body>
                {this.state.isValidationError ?
                    <Alert key="validation-error" variant="danger">
                    Please enter a valid email address
                    </Alert> : null }
                <Form noValidate validated = {this.state.validated}
                className = 'login-form' onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="emailAddress">
                        <Form.Control 
                            required
                            autoFocus
                            size = "lg"
                            type="email" 
                            placeholder="Email Address" 
                            value={this.state.emailAddress}
                            onChange={this.handleUpdate}/>
                    </Form.Group>
                    <Button
                            type="submit"
                            size="lg"
                            block
                            className = "landing-button modal-form-button">
                        Reset Password {this.state.isFetching  ? <Spinner className = "modal-form-spinner"
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
        accountModal : state.accountModal,
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    openLogin: openLogin,
    openForgotPassword: openForgetPassword,
    openSignup: openSignup,
    startRedirect: startRedirect,
    finishRedirect: finishRedirect,

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);