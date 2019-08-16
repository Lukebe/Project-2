import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState } from '../../reducers';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import Form from "react-bootstrap/Form";
import * as APICall from '../../utils/APICall';
import { Button, Spinner } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MapPicker from '../../components/MapPicker';

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful : () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    validated : boolean;
    formFields: any;
    Error: any;
    isLoading: boolean;
    isCreated: boolean;
    creationData: any;
    isAuthorized:boolean;
    isMapModalOpen: boolean;
    openedLocation: string;
}
type IProps = IComponentProps & IAuthProps;
class CreateNewJob extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            validated : false,
            isMapModalOpen: false,
            formFields: {
                productlocation: {
                  value: ''
                },
                dropofflocation: {
                    value: ''
                },
                product: {
                  value: ''
                },
                jobdate : {
                    value: ''
                },
                jobhour: {
                    value: ''
                },
                jobminute: {
                    value: ''
                },
                jobpay: {
                  value: ''  
                },
                description : {
                    value: ''
                }
            },
            Error: {isError: false, message: ''},
            isLoading: false,
            isCreated: false,
            creationData: [],
            isAuthorized: false,
            openedLocation: '',

        };
    }
    handleSubmit = async (event : any) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            this.setState({...this.state, isLoading: true});
            const formData = this.state.formFields;
            const returnData = await APICall.POST('/reimbursements', 
                {type: formData.type.value, amount: formData.amount.value, 
                description: formData.description.value});
            if(returnData instanceof Error) {
                this.setState({...this.state, isLoading:false});
            } else {
                this.setState({...this.state, isLoading:false, creationData: returnData, isCreated:true});
            }
        }
        this.setState({...this.state, validated: true});
      };
    openMap = (event: any,location: string) => {
        event.preventDefault();
        this.setState({...this.state, isMapModalOpen: true, openedLocation: location})
    }
    closeMap = (address : string) => {
        console.log(address);
        console.log(this.state.openedLocation);
        if(this.state.openedLocation === "productlocation") {
        this.setState({...this.state, isMapModalOpen: false,
            formFields: {...this.state.formFields,productlocation: {value: address}}})
        } else {
            this.setState({...this.state, isMapModalOpen: false,
                formFields: {...this.state.formFields,dropofflocation: {value: address}}})
        }
    }
    changeHandler = (event: any) => {    
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            formFields: {
                ...this.state.formFields,
                [name]: {
                ...this.state.formFields[name],
                value
                }
            }
        });
    }

    render() {
        return (
            <>
            {this.state.isMapModalOpen ?
            <MapPicker closeCallback = {this.closeMap}/> : null}
            <h2 className = "makerportal-title">New Job Listing</h2>
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formProductLocation">
                        <Form.Label>Product Location</Form.Label>
                        <Form.Control required onChange={this.changeHandler} size="lg" type="text" 
                            value = {this.state.formFields.productlocation.value}
                            id = "new-job-productlocation" placeholder = "" name="productlocation"/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid address
                        </Form.Control.Feedback>
                        <a href = "productlocation" about="productlocation" onClick = {(e)=> {this.openMap(e,'productlocation')}}>
                            <i className = "material-icons large">map</i>
                        </a>
                    </Form.Group>  
                    <Form.Group controlId="formDropoffLocation">
                        <Form.Label>Dropoff Location</Form.Label>
                        <Form.Control required onChange={this.changeHandler} size="lg" type="text" 
                            value = {this.state.formFields.dropofflocation.value}
                            id = "new-job-dropofflocation" placeholder = "" name="dropofflocation"/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid address
                        </Form.Control.Feedback>
                        <a href = "dropofflocation" about="dropofflocation" onClick = {(e)=> {this.openMap(e,'dropofflocation')}}>
                            <i className = "material-icons large">map</i>
                        </a>
                    </Form.Group> 
                    <Form.Group controlId="formProduct">
                        <Form.Label>Requested Product</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control required onChange={this.changeHandler} size="lg" type="text" 
                            value = {this.state.formFields.product.value}
                            id = "new-job-product" placeholder = "" name="product"/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a product
                        </Form.Control.Feedback>   
                        </InputGroup> 
                    </Form.Group>
                    <Form.Group controlId="formJobPay">
                        <Form.Label>Job Pay</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                            step="0.01" min="0" max = "10000" value = {this.state.formFields.jobpay.value}
                            id = "new-job-jobpay" placeholder = "0.00" name="jobpay"/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid job pay amount
                        </Form.Control.Feedback>   
                        <Form.Text className="text-muted">
                            Enter any valid number (up to 2 decimal places) between $0.00 and $10000.00.
                        </Form.Text>
                        </InputGroup> 
                    </Form.Group>
                    <Form.Group controlId="formJobDate">
                        <Form.Label>Job Date and Time</Form.Label>
                        <Form.Control required onChange={this.changeHandler} size="lg" type="date" 
                            value = {this.state.formFields.jobdate.value}
                            id = "new-job-jobdate" placeholder = "" name="jobdate"/>
                        <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                            step="1" min="1" max = "23" value = {this.state.formFields.jobhour.value}
                            id = "new-job-jobhour" placeholder = "12" name="jobhour"/> :
                        <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                            step="1" min="0" max = "59" value = {this.state.formFields.jobminute.value}
                            id = "new-job-jobminute" placeholder = "00" name="jobminute"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter some comments about your reimbursement request.
                        </Form.Control.Feedback>   
                  </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control optional onChange={this.changeHandler} as="textarea" rows="4" 
                                     placeholder = "Drop off at the front gate..." value= {this.state.formFields.description.value}
                                     name = "description"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter some comments about your reimbursement request.
                        </Form.Control.Feedback>   
                  </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    <span id = 'login-loading-container'>
                    {this.state.isLoading ?<Spinner variant = 'dark' animation='border'/> : null}
                    </span>
            </Form>
            </>
        )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful : loginSuccessful,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewJob);
