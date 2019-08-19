import React, { Component } from 'react';
import { Accordion, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { IAppState, IAuthState } from '../../reducers';
import * as APICall from '../../utils/APICall';
import { connect } from 'react-redux';
import { Job } from '../../models/Job';


export interface IAuthProps {
    user: IAuthState;
}

export class ActiveJobs extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [
            ],
            activeKey:
            '0'

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
                data : responseArray.map((item:Job, key:any) =>{
                    return new Job(item)
                })
            })
            console.log(this.state.data);
        }  
        console.log(await response);
    } 

    render() {
        const cards = this.state.data.map((item:Job, i:any) => {
            return <Card className="card" key={i}>
                        <Accordion.Toggle as={Card.Header} eventKey={i}>
                            <h6>{item.getProduct().getItemName()}</h6>
                            <p className="datetime">{item.getJobDateTime().toDateString()}|{item.getAddress()}</p> 
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={i}> 
                            <Card.Body className="cardbody">
                                <Card.Img variant="top" src={item.getProduct().getImageUrl()} />
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>{item.getDescription()}</ListGroupItem>
                                    <ListGroupItem>{item.getJobEarnings()}</ListGroupItem>
                                    <ListGroupItem>DropOff at:{item.getDropoffAddress()}</ListGroupItem>
                                    <ListGroupItem>Expected Wait Time: {item.getTimeEstimate()}</ListGroupItem>
                                </ListGroup> 
                            </Card.Body>    
                        </Accordion.Collapse>
            </Card>
        })
        return( 
            <div>
                <React.Fragment>
                    <Accordion defaultActiveKey="0">
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