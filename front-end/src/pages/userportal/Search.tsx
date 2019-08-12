import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


export default class LeftUserPortal extends Component <any, any>{

    render() {
        return(
            <React.Fragment>
                <h1>Search</h1>
                <h6>by price</h6>
                <h6>by earnings</h6>
                <h6>by date(oldest, newest)</h6>
                <h6>by category</h6>
                <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Search By:</Form.Label>
                    <Form.Control as="select">
                    <option>Date Posted</option>
                    <option>Category</option>
                    <option>Earnings</option>
                    </Form.Control>
                </Form.Group>

                </Form>

                
                
            </React.Fragment>
        );
    }
}