import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftUserPortal from './LeftUserPortal';
import RightUserPortal from './RightUserPortal'
import './UserPortal.css';
import { Footer } from '../../components/Footer'; 
import Header from '../../components/Header';

export default class AllUsers extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            data: []
        }
    }

    render() {
        return(
                <> 
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
