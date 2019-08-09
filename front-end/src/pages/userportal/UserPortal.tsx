import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftUserPortal from './LeftUserPortal';
import RightUserPortal from './RightUserPortal'
import './UserPortal.css';

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
                     <Container>
                         <Row>
                             <Col xs={4} className="container"><LeftUserPortal /></Col>
                             <Col className="container"><RightUserPortal /></Col>
                         </Row> 
                     </Container>

                </>
        );
    }
}
