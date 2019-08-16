import React, { Component } from 'react';
import { Button, Form, Spinner, Modal, Container, Col, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { IAuthState, IAppState } from '../../reducers';
import { Footer } from '../../components/Footer';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import PopularEvents from './PopularEvents';
import MyEvents from './MyEvents';
import CreateNewJob from './CreateNewJob';
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful: () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    isFetching: boolean;
}
type IProps = IComponentProps & IAuthProps;
class MakerPortal extends Component<IAuthProps, IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    render() {
        return (
            <>
                <Container className="makerportal-container">
                    <Row>
                        <Col sm={12} lg={12} >
                            Hello {this.props.auth.userProfile.getFullName()}
                            <MyEvents />
                        </Col>
                        <Col sm={12} lg={6}>
                            <PopularEvents />
                        </Col>
                        <Col sm={12} lg={6}>
                            <CreateNewJob />
                        </Col>
                    </Row>
                </Container>
                <Footer />
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
export default connect(mapStateToProps, mapDispatchToProps)(MakerPortal);