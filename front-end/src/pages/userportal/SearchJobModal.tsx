import React, { Component } from 'react';
import { ListGroup, Button, Card, Badge, Modal } from 'react-bootstrap';
import { IAuthState } from '../../reducers';


interface ModalProps {
    user: IAuthState;
    show: boolean,
    onHide: ()=>void,
    onaccept: ()=>void,
    jobid: any,
    address: any,
    usercreated: any,
    dropoffaddress: any,
    description: any,
    datecreated: any,
    dateaccepted: any,
    jobdatetime: any,
    useraccepted: any,
    jobearnings: any,
    category: any,
    timeestimate: any, 
    product: any, 
    status: any
}

export default class SearchJobModal extends Component <ModalProps, any>{
    constructor(props: any) {
        super(props);
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
                        <Card.Header><h3><Badge pill variant="success">$:{this.props.jobearnings}</Badge></h3></Card.Header>
                        <Card.Body>
                        <Card.Title></Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Job Description:{this.props.description}</ListGroup.Item>
                            <ListGroup.Item>
                                {this.props.address} | {this.props.jobdatetime}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>
                                    <Badge pill variant="info">Posted:{this.props.datecreated}</Badge>
                                    <Badge pill variant="info"></Badge>
                                    <Badge pill variant="info">TimeEstimate:{this.props.timeestimate}</Badge>
                                </h5>
                                <h4><Badge pill variant="light">PostedBy:{this.props.usercreated}</Badge></h4> 
                            </ListGroup.Item>
                            
                        </ListGroup>
                        
                        </Card.Body>
                    </Card>
                    </Modal.Body>
                    <Modal.Footer> 
                        <Button block variant="success" size="lg" onClick={this.props.onaccept}>
                            Accept Job
                        </Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}
