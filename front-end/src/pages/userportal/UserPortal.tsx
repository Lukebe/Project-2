import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftUserPortal from './LeftUserPortal';
import RightUserPortal from './RightUserPortal'
import './UserPortal.css';
import { Footer } from '../../components/Footer'; 
import Header from '../../components/Header';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { myJobsRefresh, newJobsPopulate, newJobsReset } from '../../actions/MakerPortal.action';
import { IAppState } from '../../reducers';

class AllUsers extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            data: []
        }
    }
    checkLoggedIn = () => {
        if (! (this.props.auth.userProfile.getUserId())) {
            return <Redirect push to='/' />;
        }
    }

    render() {
        return(
            <>
                {this.checkLoggedIn()}

                <Header/>
                    <Container className = "userportal-container">
                        
                        <Row>
                            <Col sm={12} md = {4} lg = {4} className="container"><LeftUserPortal /></Col>
                            <Col sm = {12} md = {8} lg = {8} className="container"><RightUserPortal /></Col>
                        </Row> 
                    </Container>
                    <Footer/>

            </>
        );
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
    myJobsRefresh: myJobsRefresh,
    newJobsPopulate: newJobsPopulate,
    newJobsReset: newJobsReset,
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
