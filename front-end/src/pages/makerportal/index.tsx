import React, { Component } from 'react';
import { Button, Form, Spinner, Modal, Container, Col, Row, Badge } from "react-bootstrap";
import { connect } from 'react-redux';
import { IAuthState, IAppState, IMakerPortalState } from '../../reducers';
import { Footer } from '../../components/Footer';
import Header from '../../components/Header';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import PopularEvents from './PopularEvents';
import MyEvents from './MyEvents';
import CreateNewJob from './CreateNewJob';
import { openNewJobs, closeNewJobs } from '../../actions/MakerPortal.action';
import isMobileDevice from '../../utils/IsMobile';
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    makerPortal: IMakerPortalState,
    openNewJobs: () => void;
    closeNewJobs: () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    isNewJobTitle: boolean;
}
type IProps = IComponentProps & IAuthProps;
class MakerPortal extends Component<IAuthProps, IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isNewJobTitle: false,
        };
    }
    toggleCreateJob = () => {
        if(this.props.makerPortal.newJobOpen){
            this.props.closeNewJobs();
        } else {
            this.props.openNewJobs();
        }
    }
    showTitle = (e: any) => {
        this.setState({isNewJobTitle: true});
    }
    hideTitle = (e : any) => {
        this.setState({isNewJobTitle: false});
    }

    render() {
        return (
            <>
                <Header />
                <Container className="makerportal-container">

                    <Row>
                        <Col sm={12} lg={12} >
                            <MyEvents />
                        </Col>
                        {(!isMobileDevice()) ? 
                            <Col lg = {12} className = "makerportal-collapse-container" style = {this.props.makerPortal.newJobOpen ? {} : 
                            {backgroundColor: "whitesmoke", boxShadow: "none", border: 0}}>
                            <Badge variant="primary" className = {(this.props.makerPortal.newJobOpen ? "newjob_menu_open" : "")}>
                                <i className = "material-icons menu_open" onMouseEnter = {this.showTitle}
                                onMouseLeave = {this.hideTitle}
                                onClick = {()=>{this.toggleCreateJob()}}>menu</i>
                            </Badge>
                            </Col> : null }

                        <Col sm={12} lg={this.props.makerPortal.newJobOpen ? 6 : 12}>
                            <PopularEvents />
                        </Col>
                        {(isMobileDevice()) ? 
                            <div className = "makerportal-collapse-container">
                               
                                <h3 className = "mobile-newjob-title">Create New Job</h3>
                            <Badge variant="primary" className = {(this.props.makerPortal.newJobOpen ? "newjob_menu_open" : "")}>
                                <i className = "material-icons menu_open" onClick = {()=>{this.toggleCreateJob()}}>menu</i>
                            </Badge>
                            </div> : null }
                        <Col sm={12}lg={6} 
                        className = {this.props.makerPortal.newJobOpen ? "createnewjob-container"  : "createnewjob-hidden"}
                        style = {this.props.makerPortal.newJobOpen ? {transform:"none"} : {}}>
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
        auth: state.auth,
        makerPortal: state.makerPortal,
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    openNewJobs: openNewJobs,
    closeNewJobs: closeNewJobs,
}
export default connect(mapStateToProps, mapDispatchToProps)(MakerPortal);