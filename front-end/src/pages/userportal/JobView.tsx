import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

export default class JobView extends Component <any, any>{

    render() {
        return(
            <React.Fragment>
                <h1>Job View</h1>
                <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                </ListGroup>
            </React.Fragment>
        );
    }
}