import React, { Component } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import Axios from 'axios'; 

export default class MyJobs extends Component <any, any>{
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
        const url =`http://localhost:3333/jobs/useraccepted/2`;
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
                <Card border="info" className="card" key={i}>
                    <Card.Body >
                        <div className="cardContainer">
                        <Card.Text className="userCardText">{item.description}<br></br>{item.address}<br></br>{item.jobDateTime}</Card.Text>
                        <Card.Link className="userCardLink" href="#"><br></br>Card Link</Card.Link>
                        </div>
                    </Card.Body>
                </Card> 
            </ListGroup.Item>
        })

        return(
            <React.Fragment>
                <h1>My Jobs</h1>
                <ListGroup>
                    <ListGroup.Item>
                    <Card>
                        {list}
                    </Card>
                    </ListGroup.Item>
                </ListGroup>
            </React.Fragment>
        );
    }
}