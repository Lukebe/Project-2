import React, { Component } from 'react';
import { Form, ListGroup, Card, Button, Row, Col } from 'react-bootstrap';
import { IAppState, IAuthState } from '../../reducers';
import { connect } from 'react-redux';
import * as APICall from '../../utils/APICall';
import Modal from './SearchJobModal';
import { Job } from "../../models/Job";
import Axios from 'axios';

export interface IAuthProps {
    user: IAuthState;
}

export class SearchCategory extends Component <IAuthProps, any>{
    constructor(props: any) {
        super(props);

        this.state = { 
            data: [],
            input: "",
            showModal: false,
            jobVal:"",
            job: [],
            jobId: 0,
            userCreated: 0,
            address: "",
            dropoffAddress: "",
            description: "",
            dateCreated: "",
            dateAccepted: "", 
            jobDateTime: "", 
            userAccepted: "", 
            jobEarnings: "",
            category: "",
            timeEstimate: "", 
            product: "", 
            status: ""
 
        } 
        this.handleRequest = this.handleRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRequestJob = this.handleRequestJob.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }

    componentDidMount(){
        this.handleRequest(1);
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



    async handleAccept() {
        console.log(this.state.jobId);
        const response = await APICall.PATCH('/jobs/'
        ,{
            jobId: 3,
            status:{
                statusId:3
            }
        }
        ,this.props.user.userProfile.getToken()); 

        console.log(response);
    }

    


    handleClick(event:any){
        const target = event.target;
        const value = target.value;
        this.setState({
            showModal: true,
            jobVal: value
        })
        console.log(this.state.jobVal);
        this.handleRequestJob(value);
    }

    async handleRequestJob(num: any) {
        const response = await APICall.GET('/jobs/' + num
        ,this.props.user.userProfile.getToken()); 

        if(await response instanceof Error){
        } else { 
            
            this.setState({ 
                jobId: response.jobId,
                address: response.address,
                dropoffAddress: response.dropoffAddress,
                description: response.description,
                dateCreated: response.dateCreated,
                dateAccepted: response.dateAccepted,
                jobDateTime: response.jobDateTime, 
                userAccepted: response.userAccepted, 
                jobEarnings: response.jobEarnings,
                category: response.category,
                timeEstimate: response.timeEstimate, 
                product: response.product, 
                status: response.status
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
                        <Modal    
                            show={this.state.showModal}
                            onHide={() => this.setState({ showModal: false })}
                            onaccept={this.handleAccept}
                            user={this.props.user}
                            jobid={this.state.jobId}  
                            usercreated={this.state.userCreated} 
                            address={this.state.address} 
                            dropoffaddress={this.state.dropoffAddress} 
                            description={this.state.description} 
                            datecreated={this.state.dateCreated} 
                            dateaccepted={this.state.dateAccepted}
                            jobdatetime={this.state.jobDateTime} 
                            useraccepted={this.state.userAccepted} 
                            jobearnings={this.state.jobEarnings} 
                            category={this.state.category} 
                            timeestimate={this.state.timeEstimate}  
                            product={this.state.product} 
                            status={this.state.status} 
                        /> 
                    </Card.Body>
                    <Card.Footer className="text-muted">{item.jobDateTime}</Card.Footer>
            </Card>
            </ListGroup.Item>
             
        })

        return(
            <React.Fragment>
                <h2>Search</h2>
                <Form className="searchCategoryForm">
                <Form.Group as= {Row}>
                    <Form.Label className="searchCatLabel" column>Category:</Form.Label>
                    <Col>
                    <Form.Control as="select" onChange={this.handleChange} name="input">
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

export default connect(mapStateToProps)(SearchCategory);