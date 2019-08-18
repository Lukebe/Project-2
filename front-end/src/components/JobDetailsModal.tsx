import { IAuthState, IAppState, IProductPickerState } from "../reducers";
import { Modal, Tabs, Tab, Nav, Col, Form } from "react-bootstrap";
import React from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import './ProductPicker.css'
import { Job } from "../models/Job";
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
}
export interface IComponentProps {
    job : Job;
    callback: Function;

}
interface IState {
}
type IProps = IComponentProps & IAuthProps;
class JobDetailsModal extends React.Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            productId: 0,
        };
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
                <h2> Login </h2>  <i className="large material-icons" onClick = {(e : any) => this.props.callback()}>close</i>
                </Modal.Header>
                <Modal.Body className = "job-details-modal-body">
                    <Col lg = {6} sm = {12}>
                    <Form.Label>Job Reference Number </Form.Label> <p>{this.props.job.getJobId()}</p>
                    <Form.Label>Date Created: </Form.Label> <p>{this.props.job.getDateCreated().getDate()}</p>
                    {(this.props.job.getDateAccepted()) ?<>
                    <Form.Label>Date Created: </Form.Label> <p>{this.props.job.getDateCreated().getDate()}</p> </>: null}
                    {(this.props.job.getUserAccepted().getUserId()) ? <>
                    <Form.Label>User Accepted </Form.Label> <p>{this.props.job.getUserAccepted().getFirstName()}</p> </>
                    : null }
                    <Form.Label>Status </Form.Label> {this.getProperStatus(this.props.job.getStatus().getStatusId())} 
                    </Col>
                    <Col lg = {6} sm = {12}>
                        <img src = {this.props.job.getProduct().getImageUrl()}/>
                        <Form.Label>Product Name</Form.Label><p>{this.props.job.getProduct().getItemName()}</p>
                        <Form.Label>Product Price</Form.Label><p>{this.props.job.getProduct().getPrice()}</p>
                        <Form.Label>Product Description</Form.Label><p className = "product-description">
                        {this.props.job.getProduct().getDescription()}</p>
                        <Form.Label>Product Address:</Form.Label><p> {this.props.job.getAddress()}</p>
                        <Form.Label>Dropoff Address:</Form.Label><p> {this.props.job.getDropoffAddress()}</p>
                    </Col>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsModal);
