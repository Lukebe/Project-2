import React, { Component } from 'react';
import { Button, Form, Spinner, Modal, Container, Col, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import {Job} from '../../models/Job';
import { IAuthState, IAppState } from '../../reducers';
import JobsCreated from './JobsCreated';
import { Switch, Route } from 'react-router-dom';
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    isFetching : boolean;
}
type IProps = IComponentProps & IAuthProps;
export class MakerPortal extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    render() {
        return (
            <>
            <Container>
                <Row>
                    <Col style = {{textAlign: 'center'}}>
                        My events

                    </Col>
                </Row>
                <Row>
                    <Col>
                    Popular events in the area
                    </Col>
                    <Col>
                    New Job Listing
                    </Col>
                </Row>
            </Container>
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(MakerPortal);