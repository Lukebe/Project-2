import React, { Component } from 'react';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ActiveJobs extends Component <any, any>{
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
                    <Accordion defaultActiveKey="0">
                        <Card className="card">
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <h6>Product</h6>
                            <p>Date : Time</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body className="cardbody">
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Job Pay</ListGroupItem>
                                    <ListGroupItem>Location</ListGroupItem>
                                    <ListGroupItem>Expected Wait Time</ListGroupItem>
                                    <ListGroupItem>Category</ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                            
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                            Job 2
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>Job 2 Details</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    
                </React.Fragment>
            </div>
        );
    }
}