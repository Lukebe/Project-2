import React, { Component } from 'react';
import { Form, ListGroup, Card, Button } from 'react-bootstrap';
import * as APICall from '../../utils/APICall';
import {RequestState} from '../../utils/APICall';
import Axios from 'axios';

export default class SearchCategory extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: []
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentDidMount(){
        this.handleRequest();
    }


    async handleRequest() {
        const url =`http://localhost:3333/jobs/category/2`;
        try{
            let response = await Axios.get(url) 
            let res = response.data.content;
            this.setState({
                data: res
            })
            console.log(this.state.data);
        } catch (e){
            console.log(e);
        }
    }

    render() {

        const list = this.state.data.map((item:any, i:any) => {
            return <ListGroup.Item className="list" key={i}>
                <Card className="card" key={i}>
                <Card.Header>Earn: ${item.jobEarnings}</Card.Header>
                    <Card.Body> 
                        <Card.Title>{item.product.itemName}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text> 
                        <Button variant="primary">View</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{item.jobDateTime}</Card.Footer>
            </Card>
            </ListGroup.Item>
            
        })


        return(
            <React.Fragment>
                <h2>Search</h2>
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
                {list}
            </React.Fragment>
        );
    }
}