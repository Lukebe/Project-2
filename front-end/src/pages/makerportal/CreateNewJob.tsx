import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState, IMakerPortalState, IProductPickerState } from '../../reducers';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import Form from "react-bootstrap/Form";
import * as APICall from '../../utils/APICall';
import { Button, Spinner, Col, Alert } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MapPicker from '../../components/MapPicker';
import { Category } from "../../models/Category";
import ProductPicker from "../../components/ProductPicker";
import { myJobsDoneRefresh, newJobsPopulate, newJobsReset, myJobsRefresh } from "../../actions/MakerPortal.action";
import { resetProduct } from "../../actions/ProductPicker.action";
import { Product } from "../../models/Product";
const RequestState = APICall.RequestState;
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    makerPortal: IMakerPortalState,
    productPicker: IProductPickerState,
    myJobsRefresh: () => void,
    newJobsPopulate: (name: string, value: any) => void,
    newJobsReset: () => void,
    resetProduct: () => void,
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    validated : boolean;
    Error: any;
    RequestStatus: {
        status: APICall.RequestState,
        errorMsg: string,
    }
    creationData: any;
    categoryList: any;
    categoriesArray: any;
    isAuthorized:boolean;
    isMapModalOpen: boolean;
    openedLocation: string;
    productPickerOpen: boolean;
    productId: number;
}
type IProps = IComponentProps & IAuthProps;
class CreateNewJob extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            validated : false,
            isMapModalOpen: false,
            productPickerOpen: false,
            Error: {isError: false, message: ''},
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            },
            creationData: [],
            categoryList: [],
            categoriesArray: [],
            isAuthorized: false,
            openedLocation: '',
            productId: 0,
        };
    }
    componentDidMount() {
        this.getCategories();
    }
    componentWillReceiveProps(props:any){
        if((props.productPicker.product !== this.props.productPicker.product)){
            if(props.productPicker.product){
            this.props.newJobsPopulate('product', props.productPicker.product.getItemName());
            this.setState({productId: props.productPicker.product.getProductId()});
            } else {
                this.props.newJobsPopulate('product', '');
                this.setState({productId: 0});
            }
        }
    }
    handleSubmit = async (event : any) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.FETCHING}});
            const formData = this.props.makerPortal.formFields;
            const estimateTimeInHours: number = formData.timeEstimateHour.value/1;
            const estimateTimeInMinutes: number = formData.timeEstimateMinute.value / 60;
            const data =
                {
                    userCreated: {userId: this.props.auth.userProfile.getUserId()}, // sends user id of the user logged in
                    dropoffAddress: formData.dropofflocation.value, // sends an address as a string
                    address: formData.productlocation.value, // sends an address as a string
                    description: formData.description.value, // sends a description as a string
                    dateAccepted: null,
                    jobDateTime: `${formData.jobdate.value} ${formData.jobhour.value}:${formData.jobminute.value}:00`, //formData.jobdate + formData.jobhour + formData.jobhour,
                    userAccepted: null,
                    category: {categoryId: formData.category.value}, // sends the category id
                    jobEarnings: formData.jobpay.value, // sends amount the worker is payed for the job
                    timeEstimate: ((estimateTimeInHours + estimateTimeInMinutes) * 60 * 1000), // sends an integer of time in milliseconds
                    product: {productId: this.state.productId || formData.product.value}, // sends product id
                    status:  {statusId: 1}
                }
            
            const returnData = await APICall.POST('/jobs', data, this.props.auth.userProfile.getToken());
            console.log(data)
            if(returnData instanceof Error) {
                this.setState({...this.state, RequestStatus: 
                    {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: `Could not complete request. Try again.`}});
            } else {
                this.setState({...this.state, RequestStatus:{...this.state.RequestStatus, status: RequestState.SUCCESSFUL}, validated: false});
                this.props.myJobsRefresh();
                this.props.newJobsReset();
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
            this.setState({...this.state, isMapModalOpen: false});
            this.props.newJobsPopulate("productlocation", address );
        } else {
            this.setState({...this.state, isMapModalOpen: false});
            this.props.newJobsPopulate("dropofflocation", address );
        }
    }
    handleProductUpdate = (productId : number) => {
        this.setState({...this.state,productPickerOpen: false});
    }
    changeHandler = (event: any) => {    
        const name = event.target.name;
        const value = event.target.value;
        this.props.newJobsPopulate(name,value);
    }
    async getCategories() {
        const response = await APICall.GET('/categories'
            , this.props.auth.userProfile.getToken());
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        if (await response instanceof Error) {
            console.log(response.message);
        } else {
            let categoriesArray = response.content.map((element: any) => {
                return new Category(element);
            });
            let categoryList : Category[] = categoriesArray.map((category: Category) => {
                return (<option value={category.getCategoryId()}>{category.getName()}</option>);
            });
            this.setState({
                ...this.state,
                categoriesArray: categoriesArray,
                categoryList: categoryList
            })
        }
        console.log(await response);
    }

    render() {
        return (
            <>
            {this.state.isMapModalOpen ?
            <MapPicker closeCallback = {this.closeMap}/> : null}
            <h2 className = "makerportal-title">New Job Listing</h2>
            {(this.state.RequestStatus.status === RequestState.ERROR) ?
                    <Alert key="request-type" className = "create-job-error" variant="danger">
                    {this.state.RequestStatus.errorMsg}
                    </Alert> : null}
            {(this.state.RequestStatus.status === RequestState.SUCCESSFUL) ?
                <Alert key="request-type" className = "create-job-success" variant="success">
                New Job Created. You will be notified when we find somebody to fulfill your job request.
                </Alert> : null}
                {(this.state.productPickerOpen) ?
                <ProductPicker callback = {this.handleProductUpdate}/> : null}
            <Form className = "createjob-form"noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                        <Form.Control as="select" onChange={this.changeHandler} 
                        name="category" size="lg">
                            <option hidden>Choose a category...</option>
                            {this.state.categoryList}

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProductLocation">
                    <Form.Label>Product Location</Form.Label>
                    <Form.Row className="formRow">
                        <Col lg="10">
                            <Form.Control required onChange={this.changeHandler} size="lg" type="text" 
                                value = {this.props.makerPortal.formFields.productlocation.value}
                                id = "new-job-productlocation" placeholder = "" name="productlocation"/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address
                            </Form.Control.Feedback>
                        </Col><Col lg="2">
                            <a href = "productlocation" about="productlocation" onClick = {(e)=> {this.openMap(e,'productlocation')}}>
                                <i className = "material-icons large">map</i>
                            </a>
                        </Col>
                    </Form.Row>
                </Form.Group>  
                <Form.Group controlId="formDropoffLocation">
                    <Form.Label>Dropoff Location</Form.Label>
                    <Form.Row className="formRow">
                        <Col lg="10">
                            <Form.Control required onChange={this.changeHandler} size="lg" type="text" 
                                value = {this.props.makerPortal.formFields.dropofflocation.value}
                                id = "new-job-dropofflocation" placeholder = "" name="dropofflocation"/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address
                            </Form.Control.Feedback>
                        </Col><Col lg="2">
                            <a href = "dropofflocation" about="dropofflocation" onClick = {(e)=> {this.openMap(e,'dropofflocation')}}>
                                <i className = "material-icons large">map</i>
                            </a>
                        </Col>
                    </Form.Row>
                </Form.Group> 
                <Form.Group controlId="formProduct">
                    <Form.Label>Requested Product</Form.Label>
                        <Form.Row className="formRow">
                            <Col lg="10">
                                    <Button onClick = {() => { this.props.resetProduct();
                                        this.setState({productPickerOpen: true})}}>Open Product Picker</Button>
                                        {(this.props.makerPortal.formFields.product.value) ?
                                        <p className = "product-selected-text">
                                            Selected Product: {this.props.makerPortal.formFields.product.value}
                                        </p> : null }
                                <Form.Control.Feedback type="invalid">
                                    Please choose a product
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                </Form.Group>
                <Form.Group controlId="formJobPay">
                    <Form.Label>Job Pay</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Row className="formRow">
                            <Col sm="1" lg="1">
                                <InputGroup.Prepend>
                                    <p>$</p>
                                </InputGroup.Prepend>
                            </Col>
                            <Col sm="6" lg="9">
                                <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                                    step="0.01" min="0" max = "10000" value = {this.props.makerPortal.formFields.jobpay.value}
                                    id = "new-job-jobpay" placeholder = "0.00" name="jobpay"/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid job pay amount
                                </Form.Control.Feedback>   
                            </Col>
                        </Form.Row>
                        <Form.Text className="text-muted">
                            Enter any valid number (up to 2 decimal places) between $0.00 and $10000.00.
                        </Form.Text>
                    </InputGroup> 
                </Form.Group>
                <Form.Group controlId="formJobDate">
                    <Form.Label>Job Date and Time</Form.Label>
                    <Form.Row className="formRow">
                        <Col>
                            <Form.Control required onChange={this.changeHandler} size="lg" type="date" 
                                value = {this.props.makerPortal.formFields.jobdate.value}
                                id = "new-job-jobdate" placeholder = "" name="jobdate"/>
                        </Col><Col></Col><Col></Col>
                    </Form.Row>
                    <Form.Row className="formRow">
                        <Col>
                        <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                            step="1" min="1" max = "23" value = {this.props.makerPortal.formFields.jobhour.value}
                            id="new-job-jobhour" placeholder="12" name="jobhour"/>
                        </Col>
                        <p>:</p>
                        <Col>
                        <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                            step="1" min="0" max = "59" value = {this.props.makerPortal.formFields.jobminute.value}
                            id = "new-job-jobminute" placeholder = "00" name="jobminute"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter some comments about your reimbursement request.
                        </Form.Control.Feedback>   
                        </Col>
                            <Col><Form.Text className="text-muted">24-hour time</Form.Text></Col>
                    </Form.Row>
                </Form.Group>
                    <Form.Group controlId="formJobDate">
                        <Form.Label>Job Time Estimate</Form.Label>
                        
                        <Form.Row className="formRow">
                            <Col sm="2" lg="2">
                            <p>Hours</p>
                            </Col>
                            <Col sm="2" lg="2">
                                <Form.Control required onChange={this.changeHandler} size="lg" type="number"
                                    step="1" min="1" max="23" value={this.props.makerPortal.formFields.timeEstimateHour.value}
                                    id="new-job-jobhour" placeholder="1" name="timeEstimateHour" />
                            </Col>
                            <Col sm="2" lg="2">
                                <p>Minutes</p>
                            </Col>
                            <Col sm="2" lg="2">
                                <Form.Control required onChange={this.changeHandler} size="lg" type="number"
                                    step="1" min="0" max="59" value={this.props.makerPortal.formFields.timeEstimateMinute.value}
                                    id="new-job-jobminute" placeholder="00" name="timeEstimateMinute" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter an estimated time for your job.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                    </Form.Group>


                <Form.Group controlId="formGroupDescription">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control optional onChange={this.changeHandler} as="textarea" rows="4" 
                                    placeholder = "Drop off at the front gate..." value= {this.props.makerPortal.formFields.description.value}
                                    name = "description"/>
                    <Form.Control.Feedback type="invalid">
                        Please enter some comments about your reimbursement request.
                    </Form.Control.Feedback>   
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
                <span id = 'login-loading-container'>
                {this.state.RequestStatus.status === RequestState.FETCHING ?<Spinner variant = 'dark' animation='border'/> : null}
                </span>
            </Form>
            </>
        )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth,
        makerPortal: state.makerPortal,
        productPicker: state.productPicker,
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    myJobsRefresh: myJobsRefresh,
    newJobsPopulate: newJobsPopulate,
    newJobsReset: newJobsReset,
    resetProduct: resetProduct,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewJob);
