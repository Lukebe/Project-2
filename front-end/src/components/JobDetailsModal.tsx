import { IAuthState, IAppState, IProductPickerState } from "../reducers";
import { Modal, Tabs, Tab, Nav, Col, Form, Button, Row } from "react-bootstrap";
import React from 'react';
import './ProductPicker.css';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import './ProductPicker.css'
import { Job } from "../models/Job";
import * as Time from "../utils/Time";
import * as APICall from '../utils/APICall';
import { myJobsRefresh } from "../actions/MakerPortal.action";
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    myJobsRefresh: () => void;
    //Action creators from the dispatcher
}
const RequestState = APICall.RequestState;
export interface IComponentProps {
    job : Job;
    callback: Function;

}
interface IState {
    RequestStatus: {
        status: APICall.RequestState,
        errorMsg: string,
    }
}
type IProps = IComponentProps & IAuthProps;
class JobDetailsModal extends React.Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            }
        };
    }
    cancelJob = async () => {
        const response : any = await APICall.PATCH('/jobs',{jobId: this.props.job.getJobId(), status: {statusId: 5}}
        ,this.props.auth.userProfile.getToken());
        if(await response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
        } else {
            this.props.myJobsRefresh();
            this.props.callback();
        }
    }
    getProperStatus(statusId : number){
        switch(statusId) {
            case 1:
                return (<p>Searching for fulfiller<i className = "material-icons">hourglass_empty</i></p>)
            case 2:
                return (<p>Job Assigned<i className = "material-icons">person</i></p>)
            case 3:
                return (<p>In Progress<i className = "material-icons">autorenew</i></p>)
            case 4:
                return (
                <p>Completed<i className = "material-icons">done</i></p>)
            case 5:
                return (<p>Cancelled<i className = "material-icons">cancel</i></p>)
            case 6:
                return (
                <p>Completed<i className = "material-icons">done</i></p>)
        }
    }
    render() {
        return (
            <Modal className = "job-details-modal" size="lg" show animation keyboard 
            onHide = {() => this.props.callback()}>
          <Modal.Header><i className="large material-icons"></i>
                <h2> Job Details </h2>  <i className="large material-icons" onClick = {(e : any) => this.props.callback()}>close</i>
                </Modal.Header>
                <Modal.Body className = "job-details-modal-body">
                    <Row>
                    <Col lg = {6} sm = {12}>
                    <Form.Label>Job Reference Number </Form.Label> <p>{this.props.job.getJobId()}</p>
                    <Form.Label>Date Created: </Form.Label> <p>
                    {Time.readableTime(this.props.job.getDateCreated())}</p>
                    {(this.props.job.getDateAccepted()) ?<>
                    <Form.Label>Date Accepted: </Form.Label> <p>
                        {Time.readableTime(this.props.job.getDateCreated())}
                        </p> </>: null}
                    {(this.props.job.getUserAccepted().getUserId()) ? <>
                    <Form.Label>User Accepted </Form.Label> <p>{}</p> </>
                    : null } 
                    <Form.Label>Estimated Delivery Time: </Form.Label> <p>{this.props.job.getExpectedTime().toString()}
                    </p>
                    <Form.Label>Status </Form.Label> {this.getProperStatus(this.props.job.getStatus().getStatusId())} 
                    </Col>
                    <Col  className = "product-side" lg = {6} sm = {12}>
                        <img src = {this.props.job.getProduct().getImageUrl()}/>
                        <Form.Label>Product Name</Form.Label><p>{this.props.job.getProduct().getItemName()}</p>
                        <Form.Label>Product Price</Form.Label><p>{this.props.job.getProduct().getPrice()}</p>
                        <Form.Label>Product Description</Form.Label><p className = "product-description">
                        {this.props.job.getProduct().getDescription()}</p>
                        <Form.Label>Product Address:</Form.Label><p> {this.props.job.getAddress()}</p>
                        <Form.Label>Dropoff Address:</Form.Label><p> {this.props.job.getDropoffAddress()}</p>
                    </Col>
                    </Row>
                    {this.props.job.getStatus().getStatusId() === 1 || this.props.job.getStatus().getStatusId() === 2 ?
                    <Col sm = {12} lg = {12}>
                        <Button className = 'delete-job-button' onClick = {() => this.cancelJob()}>Cancel Job</Button>
                    </Col> : null }
                </Modal.Body> 
            </Modal>     )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth,
        productPicker: state.productPicker,
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    myJobsRefresh: myJobsRefresh,
}
export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsModal);
