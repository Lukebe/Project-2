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
            input: ""
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.handleJobRequest = this.handleJobRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 

    componentDidMount(){
        this.handleRequest(1);
    }

    componentDidUpdate() {
        console.log(this.state.data2);
        this.props.updateJob(this.state.data2); 
    }
    async handleRequest(num:any) {
        const userid = this.props.user.userProfile.getUserId();
        const response = await APICall.GET('/jobs/useraccepted/'+ userid + '?status=' + num
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

    handleChange(event:any){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ 
            [name]: value
        });
        this.handleRequest(value);
    }

    render() {

        const list = this.state.data.map((item:Job, i:any) => {
            return <ListGroup.Item className="list" key={i}>

                <Card border="info" className="card" key={i}> 
                    <Card.Body >
                        <Container>
                        <Row>
                            <Col md="2">
                                <Card.Text className="userCardText"><br></br>ID<br></br>{item.getJobId()}</Card.Text>
                            </Col> 
                            <Col  md="4">
                                <Card.Text className="userCardText">{item.getDescription()}<br></br>{item.getAddress()}<br></br>{item.getJobDateTime().toTimeString()}</Card.Text>
                            </Col> 
                            <Col md="3"><br></br>Status<br></br>{item.getStatus().getStatus()}</Col>
                            <Col md="3"><br></br><Button onClick={()=>this.handleJobRequest(item.getJobId())}>View</Button></Col>
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
                

                <h1>My Jobs</h1>
                <Form className="searchCategoryForm">
                <Form.Group as= {Row}>
                    <Form.Label className="searchCatLabel" column>Category:</Form.Label>
                    <Col>
                    <Form.Control className="searchCatControl"as="select" onChange={this.handleChange} name="input">
                        <option value="2">Accepted</option>
                        <option value="3">In Progress</option>
                        <option value="4">Completed</option>
                        <option value="5">Cancelled</option>
                    </Form.Control>
                    </Col>
                </Form.Group>
                </Form>
                <ListGroup>
                {(!this.state.data[0]) ?

<p>You have no jobs. Go to search jobs to get some.</p> 
: null }
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
 
export default connect(mapStateToProps, mapDispatchToProps)(ByStatus);