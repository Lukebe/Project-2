import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
;
export default class Featured extends Component <any, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [
               {id:"1", product:"Playstation", Date:"1/1/2019", Time:"2:23PM", Location:"123 W. Avenue, Tampa, FL 33612", Category:"Gaming", ProductPrice:"$400", Earnings:"$100", Description:"New Playstation release only available at best buy" },
               {id:"2", product:"product2", Date:"1/2/2019", Time:"3:23PM", Location:"122 W. Avenue, Tampa, FL 60606", Category:"Gaming", Earnings:"$9.99", Description:"Description here"},
               {id:"3", product:"product3", Date:"1/3/2019", Time:"4:23PM", Location:"124 W. Avenue, Tampa, FL 60606", Category:"Shoes", Earnings:"$9.99", Description:"Description here"},
               {id:"4", product:"product4", Date:"1/4/2019", Time:"5:23PM", Location:"125 W. Avenue, Tampa, FL 60606", Category:"Event", Earnings:"$9.99", Description:"Description here"}
            ]
        }
    }

    render() {
        const cards = this.state.data.map((item:any, i:any) => {
            return <Card className="card" key={i}>
                <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>{item.product}</Card.Title>
                        <Card.Text>
                        {item.Description}
                        </Card.Text>
                        <Button variant="primary">View</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        })
        return( 
            <div>
                <React.Fragment>
                    { cards }
                </React.Fragment>
            </div>
        );
    }
}