import React, { Component } from 'react';
import { Card, ListGroup, Button, Container, Row, Col, Form } from 'react-bootstrap';
import * as APICall from '../../utils/APICall';
import { IAppState, IAuthState, IJobViewState } from '../../reducers';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Job } from '../../models/Job';
import { updateJob } from '../../actions/JobView.action';

export interface IAuthProps {
    user: IAuthState;
    jobUpdate: IJobViewState; 
    updateJob: (job: Job) => void;
}

export class ByStatus extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [],
            jobClick: "",
            data2: [],
            shouldRedirect: false,
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.handleJobRequest = this.handleJobRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLink = this.handleLink.bind(this);
    }

    componentDidMount(){
        console.log("by status linked");
        this.handleRequest();
    }

    componentDidUpdate() {
        console.log(this.state.data2);
        this.props.updateJob(this.state.data2); 
    }
    async handleRequest() {
        const userid = this.props.user.userProfile.getUserId();
        const response = await APICall.GET('/jobs/useraccepted/2'
        ,this.props.user.userProfile.getToken());

        if(await response instanceof Error){
        } else { 
            let jobArray = await response.content;
            let mappedJobArray = jobArray.map((element : any) => {
                return new Job(element);
            })
            this.setState({
                data: mappedJobArray
            })
            console.log(this.state.data);
        }
        console.log(await response);
    }


    handleLink=(event:any) =>{
        console.log("link clicked");
        const target = event.target;
        const value = event.target.value;
        this.setState({
            jobClick: value
        })
        console.log(this.state.jobClick);
        this.handleJobRequest(value);
    }

    handleChange(event:any){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ 
            [name]: value
        });
        //this.handleStatusRequest(num:any);
    }


    async handleJobRequest(num: any) {
        const response = await APICall.GET('/jobs/'  + num
        ,this.props.user.userProfile.getToken()); 

        if(await response instanceof Error){
        } else { 
            const res = new Job(await response);
            this.setState({ 
                data2: res,
                shouldRedirect: true,
            })
        }
        console.log(await response);
    }

    render() {

        const list = this.state.data.map((item:Job, i:any) => {
            return <ListGroup.Item className="list" key={i}>

                <Card border="info" className="card" key={i}>
                    <Card.Body >
                        <Container>
                        <Row>
                            <Col  md="auto">
                                <Card.Text className="userCardText">{item.getJobId()}</Card.Text>
                            </Col> 
                            <Col  md="auto">
                                <Card.Text className="userCardText">{item.getDescription()}<br></br>{item.getAddress()}<br></br>{item.getJobDateTime().toTimeString()}</Card.Text>
                            </Col>
                            <Col  >Status<br></br></Col>
                            <Col  md="auto"><Button onClick={()=>this.handleJobRequest(item.getJobId())}>View/Edit</Button></Col>
                        </Row> 
                        </Container> 
                    </Card.Body>
                </Card> 
            </ListGroup.Item>
        })

        return(
            <React.Fragment>

                {this.state.shouldRedirect ?
                    <Redirect to = "/userportal/jobview"></Redirect>
                    : null}
                
                <Form className="searchCategoryForm">
                <Form.Group as= {Row}>
                    <Form.Label className="searchCatLabel" column>Category:</Form.Label>
                    <Col>
                    <Form.Control as="select" onChange={this.handleChange} name="input">
                        <option value="1">Accepted</option>
                        <option value="2">Completed</option>
                        <option value="3">Cancelled</option>
                    </Form.Control>
                    </Col>
                    
                </Form.Group>
                </Form>

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

const mapStateToProps = (state:IAppState) => ({
    user: state.auth
});

const mapDispatchToProps = {
    updateJob: updateJob
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ByStatus);