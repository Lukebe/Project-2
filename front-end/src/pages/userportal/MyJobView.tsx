import React, { Component } from 'react';
import { ListGroup, Container, Row, Col, ButtonToolbar, Button, Card, Badge, ListGroupItem, ButtonGroup } from 'react-bootstrap';
import { IAppState, IAuthState, IJobViewState } from '../../reducers';
import { connect } from 'react-redux';
import * as APICall from '../../utils/APICall';
import { Job } from '../../models/Job';


export interface IProps {
    user: IAuthState;
    job: IJobViewState;
}

export class MyJobView extends Component <IProps, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            jobId:"",
            data: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }
    componentDidMount(){
        console.log(this.props.job);
    }

    handleComplete(even:any){
        this.requestUpdateComplete();

    }


    handleCancel(event:any){
        this.requestUpdateCancel();
    }

    async requestUpdateCancel(){
        const id = this.props.job.job.getJobId();
        console.log(id);

        const response = await APICall.PATCH('/jobs/'
        ,{
            jobId: id,
            status:{
                statusId:5
            }
        }
        ,this.props.user.userProfile.getToken()); 

        console.log(response);
    }

    async requestUpdateComplete(){
        const id = this.props.job.job.getJobId();
        console.log(id);
        const response = await APICall.PATCH('/jobs/'
        ,{
            jobId: id,
            status:{
                statusId:4
            }
        }
        ,this.props.user.userProfile.getToken()); 

        console.log(response);
    }

    render() {
        return(
            <React.Fragment>
                <h1>Job View</h1>
                <div className="jobViewContainer">
                    <Card className="jobViewCard" border="primary" style={{ width: '38rem' }}>
                        <Card.Header><h3><Badge pill variant="success">${this.props.job.job.getJobEarnings()}</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title>{}</Card.Title>
                        <Container>
                            <Row>
                            <ButtonGroup className="myJobViewButtonGroup" aria-label="Basic example">
                            <Button onClick = {this.handleComplete} variant="success" size="lg">Complete</Button>
                            <Button onClick = {this.handleCancel} variant="warning">Cancel</Button>
                            </ButtonGroup>
                            </Row> 
                            <Row>
                                <Col>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Product/Event:{this.props.job.job.getProduct().getItemName()}</ListGroupItem>
                                    <ListGroupItem>Address:{this.props.job.job.getAddress()}</ListGroupItem>
                                    <ListGroupItem>DateAccepted:{}</ListGroupItem>
                                    <ListGroupItem>Status:{this.props.job.job.getStatus().getStatus()}</ListGroupItem>
                                    <ListGroupItem>DatePosted:{}</ListGroupItem>
                                </ListGroup>
                                </Col> 
                                <Col>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>JobPay:{this.props.job.job.getJobEarnings()}</ListGroupItem>
                                    <ListGroupItem>Time Estimate:{this.props.job.job.getTimeEstimate()}</ListGroupItem>
                                    <ListGroupItem>Dropoff Location:{this.props.job.job.getDropoffAddress()}</ListGroupItem>
                                    <ListGroupItem>User Posted:{}</ListGroupItem>
                                    <ListGroupItem>Category:{this.props.job.job.getCategory().getName()}</ListGroupItem>
                                </ListGroup>    
                                </Col>
                            </Row>
                        </Container>
                        </Card.Body>
                    </Card>
                </div>
                
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state:IAppState) => ({
    user: state.auth,
    job: state.viewJob
});

 
export default connect(mapStateToProps)(MyJobView);
