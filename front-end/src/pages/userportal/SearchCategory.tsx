import React, { Component } from 'react';
import { Form, ListGroup, Card, Button, Row, Col } from 'react-bootstrap';
import { IAppState, IAuthState, IJobViewState } from '../../reducers';
import { connect } from 'react-redux';
import * as APICall from '../../utils/APICall';
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
            input: "",
            jobVal:"",
            job: [],
            shouldRedirect:false
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRequestJob = this.handleRequestJob.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.handleRequest(1);
    }

    componentDidUpdate() {
        console.log(this.state.job);
        this.props.updateJob(this.state.job); 
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

    async handleRequest(num: any) {
        const response = await APICall.GET('/jobs/category/' + num + '?status=2'
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


    handleClick(event:any){
        const target = event.target;
        const value = target.value;
        this.handleRequestJob(value);
    }

    async handleRequestJob(num: any) {
        const response = await APICall.GET('/jobs/'  + num
        ,this.props.user.userProfile.getToken()); 

        if(await response instanceof Error){
        } else { 
            const res = new Job(await response);
            this.setState({ 
                job: res,
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
                            onClick=  {this.handleClick} 
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
                    <Form.Control className="searchCatControl"as="select" onChange={this.handleChange} name="input">
                        <option value="1">Tech</option>
                        <option value="3">Shoes</option>
                        <option value="4">Concert/Events</option>
                        <option value="2">Other</option>
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