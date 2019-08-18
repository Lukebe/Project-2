import React, { Component } from 'react';
import { ListGroup, Container, Row, Col, ButtonToolbar, Button, Card, Badge, ListGroupItem, ButtonGroup } from 'react-bootstrap';

export default class MyJobView extends Component <any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <h1>Job View</h1>
                <div className="jobViewContainer">
                    <Card className="jobViewCard" border="primary" style={{ width: '38rem' }}>
                        <Card.Header><h3><Badge pill variant="success">$:Amount</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title>JobDateTime</Card.Title>
                        <Container>
                            <Row>
                            <ButtonGroup className="myJobViewButtonGroup" aria-label="Basic example">
                            <Button variant="success" size="lg">Complete</Button>
                            <Button variant="warning">Cancel</Button>
                            </ButtonGroup>
                            </Row> 
                            <Row>
                                <Col>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Product</ListGroupItem>
                                    <ListGroupItem>Address</ListGroupItem>
                                    <ListGroupItem>userCreated</ListGroupItem>
                                    <ListGroupItem>Status</ListGroupItem>
                                    <ListGroupItem>DateCreated</ListGroupItem>
                                </ListGroup>
                                </Col> 
                                <Col>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Earnings</ListGroupItem>
                                    <ListGroupItem>TimeEstimate</ListGroupItem>
                                    <ListGroupItem>DropoffAddress</ListGroupItem>
                                    <ListGroupItem>userCreated</ListGroupItem>
                                    <ListGroupItem>category</ListGroupItem>
                                </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                        </Card.Body>
                    </Card>
                </div>
                
            </React.Fragment>
        );
    }
}
