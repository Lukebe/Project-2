import React, { Component } from 'react';
import { Form, ListGroup, Card, Button } from 'react-bootstrap';
import * as APICall from '../../utils/APICall';
import {RequestState} from '../../utils/APICall';

export default class SearchCategory extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [
               {id:"1", product:"Playstation", Date:"1/1/2019", Time:"2:23PM", Location:"123 W. Avenue, Tampa, FL 33612", Category:"Gaming", ProductPrice:"$400", Earnings:"$100", Description:"New Playstation release only available at best buy", Pay: "200.00"},
               {id:"2", product:"product2", Date:"1/2/2019", Time:"3:23PM", Location:"122 W. Avenue, Tampa, FL 60606", Category:"Gaming", Earnings:"$9.99", Description:"Description here", Pay: "300.00"},
               {id:"3", product:"product3", Date:"1/3/2019", Time:"4:23PM", Location:"124 W. Avenue, Tampa, FL 60606", Category:"Shoes", Earnings:"$9.99", Description:"Description here", Pay: "400.00"},
               {id:"4", product:"product4", Date:"1/4/2019", Time:"5:23PM", Location:"125 W. Avenue, Tampa, FL 60606", Category:"Event", Earnings:"$9.99", Description:"Description here", Pay: "500.00"}
            ], 

            jobs: [],

            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
        
            }
            
        } 
    }


    componentDidMount(){
        this.handleRequest();
    }


    async handleRequest() {
        const response = await APICall.GET('/jobs/category/2');

        if(await response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus,
                    status: RequestState.ERROR,
                    errorMsg: response.message}});
        } else {
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus,
                    status: RequestState.SUCCESSFUL}});
            alert(response);
        }
    }

    render() {
        const list = this.state.data.map((item:any, i:any) => {
            return <ListGroup.Item className="list" key={i}>
                <Card className="card" key={i}>
                <Card.Header>Earn: ${item.Pay}</Card.Header>
                    <Card.Body> 
                        <Card.Title>{item.product}</Card.Title>
                        <Card.Text>
                        {item.Description}
                        </Card.Text> 
                        <Button variant="primary">View</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
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