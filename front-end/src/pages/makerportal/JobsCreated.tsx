import React, { Component } from 'react';
import { Button, Form, Spinner, Modal, Container, Col, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {Job} from '../../models/Job';
import { IAuthState, IAppState } from '../../reducers';
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    isFetching : boolean;
    data : Job[] | null;
}
type IProps = IComponentProps & IAuthProps;
export class Login extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            data: null,
        };
    }

    render() {
        return (
            <Container>
                hi
            </Container>
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

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);