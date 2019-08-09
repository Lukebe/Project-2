import React, { Component } from 'react';
import * as APICall from '../../utils/APICall';
import { Button, Form, Spinner, Modal } from "react-bootstrap";
import { IAuthState, IAppState, IAccountState } from '../../reducers';
import { startRedirect, finishRedirect } from '../../actions/Authentication.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './account.css';
import { openForgetPassword, openSignup, openLogin } from '../../actions/AccountModal.action';
export interface IReduxProps {
    //data from state store
    auth: IAuthState;
    accountModal: IAccountState;
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
}
type IProps = IComponentProps & IReduxProps;
export class Login extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
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
                dialogClassName="login-modal"
                animation = {false} centered keyboard
                backdropClassName = "login-modal-backdrop"
                size = "lg">
                <Modal.Header closeLabel = "Close">  <i className="large material-icons"></i>
                <h2> Login </h2>  <i className="large material-icons" onClick = {this.handleClose}>close</i>
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
                            value={this.state.username}
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
                    <Button variant="primary" 
                            type="submit"
                            size="lg"
                            block
                            className = "landing-button modal-form-button"
                            onClick = {this.handleSubmit}>
                        Login {this.state.isFetching  ? <Spinner className = "modal-form-spinner"
                        animation = "border" variant = "light"/> : null}
                    </Button>
                    <div className = "login-modal-bottom-links">
                    <a onClick = {this.props.openForgotPassword} className = "forgot-password" href= "#">Forgot Password?</a>
                    <p>Don't have an account? <a onClick = {this.props.openSignup} href= "#">Sign Up</a></p>
                    </div>
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
    openForgotPassword: openForgetPassword,
    openSignup: openSignup,
    startRedirect: startRedirect,
    finishRedirect: finishRedirect,

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);