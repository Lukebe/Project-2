import React, { Component } from 'react';
import { Form, ListGroup, Card, Button, Row, Col } from 'react-bootstrap';
import { IAppState, IAuthState, IJobViewState } from '../../reducers';
import { connect } from 'react-redux';
import * as APICall from '../../utils/APICall';
import Modal from './SearchJobModal';
import { Job } from "../../models/Job";
import { updateJob } from '../../actions/JobView.action';
import { Redirect } from 'react-router-dom';


export interface IAuthProps {
    user: IAuthState;
    job: IJobViewState;
    updateJob: (job: Job) => void;
}

export class SearchCategory extends Component <IAuthProps, any>{
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

        const list = this.state.data.map((item:any, i:any) => {
            return <ListGroup.Item className="list" key={i}>
                <Card className="card" key={i}>
                <Card.Header>Earn: ${item.jobEarnings}</Card.Header>
                    <Card.Body> 
                        <Card.Title>{item.product.itemName}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>  
                        <Button 
                            onClick={()=>this.handleJobRequest(item.getJobId())} 
                            value= {item.jobId}
                            variant="primary"> 
                            View
                        </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{item.jobDateTime}</Card.Footer>
            </Card>
            </ListGroup.Item>
             
        })

        return(
            
            <React.Fragment>
                {this.state.shouldRedirect ?
                    <Redirect to = "/userportal/acceptJob"></Redirect>
                    : null}
                <h2>Search</h2>
                <Form className="searchCategoryForm">
                <Form.Group as= {Row}>
                    <Form.Label className="searchCatLabel" column>Category:</Form.Label>
                    <Col>
                    <Form.Control as="select"  name="input">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Control>
                    </Col>
                    
                </Form.Group>
                </Form>
                {list}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchCategory);