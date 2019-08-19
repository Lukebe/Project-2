import { IAuthState, IAppState, IProductPickerState } from "../reducers";
import { Modal, Tabs, Tab, Form, Col, Button, InputGroup, Spinner } from "react-bootstrap";
import React, { Component } from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";
import * as APICall from '../utils/APICall';
import { Category } from "../models/Category";
import { chooseProduct } from "../actions/ProductPicker.action";
import { Product } from "../models/Product";
import { async } from "q";
import ProductPicker from "./ProductPicker";
const RequestState = APICall.RequestState;

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    productPicker: IProductPickerState,
    chooseProduct: (product: Product) => void
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    validated: boolean;
    Error: any;
    RequestStatus: {
        status: APICall.RequestState,
        errorMsg: string,
    }
    formFields: any;
    creationData: any;
    categoryList: any;
    categoriesArray: any;
    isAuthorized: boolean;
    isMapModalOpen: boolean;
    openedLocation: string;
    productPickerOpen: boolean;
    productId: number;
}
type IProps = IComponentProps & IAuthProps;
class CreateProduct extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            validated: false,
            isMapModalOpen: false,
            productPickerOpen: false,
            Error: { isError: false, message: '' },
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            },
            formFields: {
                productPrice: 0,
                productName: '',
                imageUrl: '',
                category: '',
                description: ''
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
    changeHandler = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState ({
            ...this.state,
            formFields:{
                ...this.state.formFields,
                [name]: value
            }
        });
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
            let categoryList: Category[] = categoriesArray.map((category: Category) => {
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
    handleSubmit = async(event:any) =>{
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.createProduct();
        }
    }
    createProduct = async () =>{
        this.setState({
            ...this.state, RequestStatus:
                { ...this.state.RequestStatus, status: RequestState.FETCHING }
        });
        const data ={
            itemName: this.state.formFields.productName,
            price: this.state.formFields.productPrice,
            category: { categoryId: this.state.formFields.category},
            imageUrl: this.state.formFields.imageUrl,
            description: this.state.formFields.description
        }
        const returnData = await APICall.POST('/products', data, this.props.auth.userProfile.getToken());
        console.log(returnData);
        console.log(data);

        if (returnData instanceof Error) {
            this.setState({
                ...this.state, RequestStatus:
                    { ...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: `Could not complete request. Try again.` }
            });
        } else {
            this.setState({ ...this.state, RequestStatus: { ...this.state.RequestStatus, status: RequestState.SUCCESSFUL }, validated: false });
            this.props.chooseProduct(new Product(returnData));
        }
    }
    render() {
        return (
            <>
                <Form className="createjob-form, darkBackground" noValidate validated={this.state.validated} onSubmit={(e:any) => this.handleSubmit(e)}>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={this.state.formFields.category.value} onChange={this.changeHandler}
                            name="category" size="lg">
                            <option hidden>Choose a category...</option>
                            {this.state.categoryList}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProductName" className="lightGrayBackground">
                        <Form.Label>Product Name</Form.Label>
                            <Form.Row className="formRow">
                                <Col lg="12">
                                <Form.Control required onChange={this.changeHandler} size="lg" type="string" className="darkColor"
                                        value={this.state.formFields.productName.value}
                                        id="new-product-productname" placeholder="Samsung Galazy Note 10" name="productName" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a name for the product
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formProductImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                            <Form.Row className="formRow">
                                <Col lg="12">
                                    <Form.Control required onChange={this.changeHandler} size="lg" type="string"
                                        value={this.state.formFields.imageUrl.value}
                                    id="new-product-imageurl" placeholder="https://i-cdn.phonearena.com/images/article/118249-two_lead/Samsungs-Aura-Blue-Galaxy-Note-10-is-reportedly-coming-to-Europe.jpg" name="imageUrl" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a URL of an image
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Product Cost</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Row className="formRow">
                                <Col sm="1" lg="1">
                                    <InputGroup.Prepend>
                                        <p>$</p>
                                    </InputGroup.Prepend>
                                </Col>
                                <Col sm="6" lg="9">
                                    <Form.Control required onChange={this.changeHandler} size="lg" type="number"
                                        step="0.01" min="0" max="10000" value={this.state.formFields.productPrice.value}
                                        id="new-product-productcost" placeholder="0.00" name="productPrice" />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid product cost
                                </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                            <Form.Text className="text-muted">
                                Enter any valid number (up to 2 decimal places) between $0.00 and $10000.00.
                        </Form.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control optional onChange={this.changeHandler} as="textarea" rows="4"
                            placeholder="Phone color aura blue..." value={this.state.formFields.description.value}
                            name="description" />
                        <Form.Control.Feedback type="invalid">
                            Please enter some comments about your reimbursement request.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">
                        Submit
                </Button>
                    <span id='login-loading-container'>
                        {this.state.RequestStatus.status === RequestState.FETCHING ? <Spinner variant='dark' animation='border' /> : null}
                    </span>
                </Form>
            </>
        )
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth,
        productPicker: state.productPicker
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful : loginSuccessful,
    chooseProduct: chooseProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
