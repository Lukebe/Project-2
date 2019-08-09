import React, { Component } from 'react';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Item } from 'react-bootstrap/lib/Pagination';

export default class ActiveJobs extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [
               {id:"1", product:"product1", Date:"1/1/2019", Time:"2:23PM", Location:"123 W. Avenue, Tampa, FL 60606", Category:"Tech", Earnings:"$9.99"},
               {id:"2", product:"product2", Date:"1/2/2019", Time:"3:23PM", Location:"122 W. Avenue, Tampa, FL 60606", Category:"Gaming", Earnings:"$9.99"},
               {id:"3", product:"product3", Date:"1/3/2019", Time:"4:23PM", Location:"124 W. Avenue, Tampa, FL 60606", Category:"Shoes", Earnings:"$9.99"},
               {id:"4", product:"product4", Date:"1/4/2019", Time:"5:23PM", Location:"125 W. Avenue, Tampa, FL 60606", Category:"Event", Earnings:"$9.99"}
            ]
        }
    }

    render() {
        const cards = this.state.data.map((item:any, i:any) => {
            return <Card className="card" key={i}>
                        <Accordion.Toggle as={Card.Header} eventKey={item.id}>
                            <h6>{item.product}</h6>
                            <p className="datetime">{item.Date} {item.Time}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={item.id}>
                            <Card.Body className="cardbody">
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>{item.Earnings}</ListGroupItem>
                                    <ListGroupItem>{item.Location}</ListGroupItem>
                                    <ListGroupItem>Expected Wait Time</ListGroupItem>
                                    <ListGroupItem>{item.Category}</ListGroupItem>
                                </ListGroup>
                            </Card.Body>    
                        </Accordion.Collapse>
            </Card>
        })
        return( 
            <div>
                <React.Fragment>
                    <Accordion defaultActiveKey="1">
                        {cards}
                    </Accordion>
                </React.Fragment>
            </div>
        );
    }
}