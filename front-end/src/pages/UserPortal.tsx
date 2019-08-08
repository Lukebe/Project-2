import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JobsAccepted from './LeftUserPortal';
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
            <div>
                <React.Fragment>
                     <Container>
                         <Row>
                             <Col xs={4} className="container"><JobsAccepted /></Col>
                             <Col className="container">
                                 <h3>Component Nav</h3>
                                 <p>Search Jobs</p>
                                 <p>Promoted Jobs</p>
                                 <p>My Jobs</p>
                                 <p>Account Info</p>
                             </Col>
                         </Row>
                     </Container>
                    
                </React.Fragment>
            </div>
        );
    }
}
