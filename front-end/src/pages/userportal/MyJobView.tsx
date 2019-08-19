import React, { Component } from 'react';
import { ListGroup, Container, Row, Col, ButtonToolbar, Button, Card, Badge, ListGroupItem, ButtonGroup } from 'react-bootstrap';
import { IAppState, IAuthState, IJobViewState } from '../../reducers';
import { connect } from 'react-redux';
import * as APICall from '../../utils/APICall';
import { Job } from '../../models/Job';


export interface IProps {
    user: IAuthState;
    job: IJobViewState;
    updateJob: (id: any) => void;
}

export class MyJobView extends Component <IProps, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            jobPulled:[],
            jobId:"",
            data: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleRequestJob = this.handleRequestJob.bind(this);
    }
    componentDidMount(){
        //this.handleRequestJob(39); 
    }

    handleComplete(even:any){
        this.requestUpdateComplete();

    }


    handleCancel(event:any){
        this.requestUpdateCancel();
    }

    async requestUpdateCancel(){
        console.log(this.state.jobId);
        const response = await APICall.PATCH('/jobs/'
        ,{
            jobId: 39,
            status:{
                statusId:5
            }
        }
        ,this.props.user.userProfile.getToken()); 

        console.log(response);
    }

    async requestUpdateComplete(){
        console.log(this.state.jobId);
        const response = await APICall.PATCH('/jobs/'
        ,{
            jobId: 39,
            status:{
                statusId:4
            }
        }
        ,this.props.user.userProfile.getToken()); 

        console.log(response);
    }

    async handleRequestJob(num: any) {
        const response = await APICall.GET('/jobs/'  + num
        ,this.props.user.userProfile.getToken()); 

        if(await response instanceof Error){
        } else { 
            let res = response.data;
            this.setState({ 
                data: new Job(response)
            })
            console.log(this.state.data);
        }
        console.log(await response);
    }

    render() {
        return(
            <React.Fragment>
                <h1>Job View</h1>
                <div className="jobViewContainer">
                    <Card className="jobViewCard" border="primary" style={{ width: '38rem' }}>
                        <Card.Header><h3><Badge pill variant="success">${}</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title>JobDateTime</Card.Title>
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
                                    <ListGroupItem>Product</ListGroupItem>
                                    <ListGroupItem>Address</ListGroupItem>
                                    <ListGroupItem>userCreated</ListGroupItem>
                                    <ListGroupItem>Status</ListGroupItem>
                                    <ListGroupItem>DateCreated</ListGroupItem>
                                </ListGroup>
                                </Col> 
                                <Col>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Earnings</ListGroupItem>
                                    <ListGroupItem>TimeEstimate</ListGroupItem>
                                    <ListGroupItem>DropoffAddress</ListGroupItem>
                                    <ListGroupItem>userCreated</ListGroupItem>
                                    <ListGroupItem>category</ListGroupItem>
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
