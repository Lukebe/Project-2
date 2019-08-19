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

export class AcceptJobView extends Component <IProps, any>{
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
                <Card className="jobViewCard" border="success" style={{ width: '38rem' }}>
                        <Card.Header><h3><Badge pill variant="success">$:</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title>{this.props.job.job.getProduct().getItemName()}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Job Description:{}</ListGroup.Item>
                            <ListGroup.Item>
                                {} | {}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5> 
                                    <Badge pill variant="info">Posted:{}</Badge>
                                    <Badge pill variant="info"></Badge>
                                    <Badge pill variant="info">TimeEstimate:{}</Badge>
                                </h5>
                                <h4><Badge pill variant="light">PostedBy:{}</Badge></h4> 
                            </ListGroup.Item>
                            
                        </ListGroup>
                        
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

 
export default connect(mapStateToProps)(AcceptJobView);