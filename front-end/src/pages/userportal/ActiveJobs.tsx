import React, { Component } from 'react';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { IAppState, IAuthState } from '../../reducers';
import * as APICall from '../../utils/APICall';
import { connect } from 'react-redux';


export interface IAuthProps {
    user: IAuthState;
}

export class ActiveJobs extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [
            ]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    componentDidMount(){
        this.handleRequest();
    }

    async handleRequest() {
        const userid = this.props.user.userProfile.getUserId();
        const response = await APICall.GET('/jobs/status/3'
        ,this.props.user.userProfile.getToken());

        if(await response instanceof Error){
        } else { 
            let responseArray = response.content;
            this.setState({
                data : responseArray
            })
            console.log(this.state.data);
        } 
        console.log(await response);
    } 

    render() {
        const cards = this.state.data.map((item:any, i:any) => {
            return <Card className="card" key={i}>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <h6>{}</h6>
                            <p className="datetime">{} {}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body className="cardbody">
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>{}</ListGroupItem>
                                    <ListGroupItem>{}</ListGroupItem>
                                    <ListGroupItem>Expected Wait Time</ListGroupItem>
                                    <ListGroupItem>{}</ListGroupItem>
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

const mapStateToProps = (state:IAppState) => ({
    user: state.auth
});

export default connect(mapStateToProps)(ActiveJobs);