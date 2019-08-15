import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

export default class MyJobs extends Component <any, any>{

    render() {
        return(
            <React.Fragment>
                <h1>My Jobs</h1>
                <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item> 
                </ListGroup>
            </React.Fragment>
        );
    }
}