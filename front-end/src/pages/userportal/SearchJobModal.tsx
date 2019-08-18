import React, { Component } from 'react';
import { ListGroup, Button, Card, Badge, Modal } from 'react-bootstrap';
import { IAuthState } from '../../reducers';
import { Job } from "../../models/Job";
import { thisTypeAnnotation } from '@babel/types';

interface ModalProps {
    user: IAuthState;
    show: boolean,
    onHide: ()=>void,
    onaccept: ()=>void,
    job: Job
}

export default class SearchJobModal extends Component <ModalProps, any>{
    constructor(props: any) {
        super(props);
        this.state={
            jobSeen:[],
            address:"",
        }
        this.handleAccept = this.handleAccept.bind(this);
    }

    handleAccept(event:any){
         console.log(this.props.job);
         console.log(this.props.job.getJobPrice());
         console.log(this.props.job.getAddress()); 
         this.setState({
             address: this.props.job.getAddress()
         })
    } 
    
    
    
    render() {
        return( 
            <React.Fragment>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Earn Now
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Card className="jobViewCard" border="success" style={{ width: '38rem' }}>
                        <Card.Header><h3><Badge pill variant="success">$:</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title></Card.Title>
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
                    </Modal.Body>
                    <Modal.Footer> 
                        <Button block variant="success" size="lg" onClick={this.handleAccept}>
                            Accept Job
                        </Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}
