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
            data: [],
            shouldRedirect: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.requestAccept = this.requestAccept.bind(this);
    }
    componentDidMount(){
        console.log(this.props.job);
    }


    async requestAccept(){
        const id = this.props.job.job.getJobId();
        console.log(id);

        const response = await APICall.PATCH('/jobs/'
        ,{
            jobId: id, 
            status:{
                statusId:2            }
        }
        ,this.props.user.userProfile.getToken()); 

        console.log(response);
    }

    handleAccept(e:any){
        this.requestAccept();

    }

    render() {
        return(
            <React.Fragment>
                <h1>Job View</h1>
                <div className="jobViewContainer">
                <Card className="jobViewCard" border="success" style={{ width: '38rem' }}>
                        <Card.Header><h3><Badge pill variant="success">${this.props.job.job.getJobEarnings()}</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title>{this.props.job.job.getProduct().getItemName()}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Job Description:{this.props.job.job.getDescription()}</ListGroup.Item>
                            <ListGroup.Item>
                                {this.props.job.job.getJobDateTime().toDateString()} | {this.props.job.job.getAddress()}
                            </ListGroup.Item> 
                            <ListGroup.Item>
                                <h5> 
                                    <Badge pill variant="info">Posted:{this.props.job.job.getDateCreated().toString()}</Badge>
                                    <Badge pill variant="info"></Badge>
                                    <Badge pill variant="info">TimeEstimate:{this.props.job.job.getTimeEstimate()}</Badge>
                                </h5>
                                <h4><Badge pill variant="light">PostedBy:{}</Badge></h4> 
                            </ListGroup.Item>
                            
                        </ListGroup>
                        
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button block variant="success" size="lg" onClick={this.handleAccept}>
                            Accept Job
                            </Button>
                            <Button>Close</Button>
                            </Card.Footer>
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