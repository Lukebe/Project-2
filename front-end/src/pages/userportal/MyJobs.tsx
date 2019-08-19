import React, { Component } from 'react';
import { Card, ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import * as APICall from '../../utils/APICall';
import { IAppState, IAuthState, IJobViewState } from '../../reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Job } from '../../models/Job';
import { updateJob } from '../../actions/JobView.action';

export interface IAuthProps {
    user: IAuthState;
    job: IJobViewState; 
    updateJob: (job: any) => void;
}

export class MyJobs extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [],
            jobClick: "",
            data2: []
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.handleJobRequest = this.handleJobRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLink = this.handleLink.bind(this);
    }

    componentDidMount(){
        this.handleRequest();
    }


    async handleRequest() {
        const userid = this.props.user.userProfile.getUserId();
        const response = await APICall.GET('/jobs/useraccepted/2'
        ,this.props.user.userProfile.getToken());

        if(await response instanceof Error){
        } else { 
            let res = response.content;
            this.setState({
                data: res
            })
            console.log(this.state.data);
        }
        console.log(await response);
    }


    handleLink=(event:any) =>{
        console.log("link clicked");
        const target = event.target;
        const value = target.value;
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
            let res = response.data;
            this.setState({ 
                data2: new Job(response)
            })
            console.log(this.state.data2);
        }
        console.log(await response);
    }

    render() {

        const list = this.state.data.map((item:any, i:any) => {
            return <ListGroup.Item className="list" key={i}>
                <Card border="info" className="card" key={i}>
                    <Card.Body >
                        <Container>
                        <Row>
                            <Col  md="auto">
                                <Card.Text className="userCardText">{item.jobId}</Card.Text>
                            </Col> 
                            <Col  md="auto">
                                <Card.Text className="userCardText">{item.description}<br></br>{item.address}<br></br>{item.jobDateTime}</Card.Text>
                            </Col>
                            <Col  >Status<br></br></Col>
                            <Col  md="auto"><Link to="/userportal/jobview" className="userCardLink"><Button onClick={this.handleLink}>View/Edit</Button></Link></Col>
                        </Row> 
                        </Container> 
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

const mapStateToProps = (state:IAppState) => ({
    user: state.auth
});

const mapDispatchToProps = {
    updateJob: updateJob
}
 
export default connect(mapStateToProps,mapDispatchToProps)(MyJobs);