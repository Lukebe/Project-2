import { IAuthState, IAppState, IProductPickerState } from "../reducers";
import { Modal, Tabs, Tab, Card, Alert, Spinner, Form, Button } from "react-bootstrap";
import React from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";
import Pagination from "../models/Pagination";
import { Product } from "../models/Product";
import * as APICall from '../utils/APICall';
import { chooseProduct } from "../actions/ProductPicker.action";

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    productPicker : IProductPickerState,
    chooseProduct : (product : Product) => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {

}
interface IState {
    data : Product[];
    dataPagination: Pagination;
    RequestStatus: {
        status: APICall.RequestState,
        errorMsg: string,
    },
    search: any,
}
const RequestState = APICall.RequestState;
type IProps = IComponentProps & IAuthProps;
class ProductList extends React.Component <IProps,IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            dataPagination: new Pagination({empty:true}),
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            },
            search: '',
            
        }       

    }
    
    componentDidMount() {
        this.getProducts(0);
    }
    createPagination = () => {
        if(this.state.dataPagination.getPageNumber() === undefined){
            return;
        }
        let elements = [];
            for (let i = 0; i < this.state.dataPagination.getTotalPages(); i++) {
          elements.push(<li className=
            {i === this.state.dataPagination.getPageNumber() ? "active" : ""}>
                <a href="#" onClick = {(e:any) => {e.preventDefault(); this.getProducts(i)}}>Click</a></li>);
        }
        return elements;
      }
      goBackClick = (e : any) => {
        e.preventDefault();
        if(!this.state.dataPagination.isFirstPage()){
            this.getProducts(this.state.dataPagination.getPageNumber() - 1)
        }
    }
    goForwardClick = (e : any) => {
        e.preventDefault();
        if(!this.state.dataPagination.isLastPage()){
            this.getProducts(this.state.dataPagination.getPageNumber() + 1)
        }
    }
    searchValueChange = (event : any) => {
            if(event.target.value !== undefined){
                this.getProducts(0,event.target.value);
            }
            this.setState({...this.state, [event.target.id]: event.target.value});

    }
    async getProducts(page : number, search : string = '') {
        this.setState({...this.state, RequestStatus: 
            {...this.state.RequestStatus, status: RequestState.FETCHING}});
        const url = (search) ? '/products/search?query=itemName:' + search + '&page=' + page + '&size=6&sort=itemName,desc'
        : '/products?page=' + page + '&size=6&sort=itemName,desc';
        const response = await APICall.GET(url
        ,this.props.auth.userProfile.getToken());
        if(await response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
        } else {
            let responseArray = response.content;
            let productsArray : Product[] = responseArray.map((element:any, index: number)=>{
                return new Product(element);
            })
            console.log(productsArray);
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.SUCCESSFUL}});
            this.setState({data: productsArray, dataPagination: new Pagination(await response)})
        }
    }
    render() {
        return (
                <>
                {this.state.RequestStatus.status === RequestState.ERROR ?
                    <Alert key="request-error" className = "my-events-error" variant="danger">
                        Error retrieving data from server : {this.state.RequestStatus.errorMsg}
                    </Alert> : null}
                {this.state.RequestStatus.status === RequestState.FETCHING ? 
                    <Spinner className = "my-events-loading-spinner"
                    animation = "border" variant = "light"/> : null}
                <div className = "product-list-container">     
                <Form.Control 
                            type="text" 
                            size = "lg"
                            id = "search"
                            placeholder="Search..." 
                            value={this.state.search}
                            onChange={this.searchValueChange}/>
                <div className = "product-list-data">
                    {(this.state.data[0]) ? this.state.data.map((element: Product) => {
    
                    return (
                    <>
                    <Card className = "product-card">
                    <Card.Img variant="top" src={element.getImageUrl()} />
                        <Card.Body>
                            <Card.Title>{element.getItemName()}</Card.Title>
                            <Card.Text className = "attribute attrbute-description">
                                {element.getDescription()}
                            </Card.Text>
                            <Card.Text className = "attribute">
                            <i className = "material-icons">attach_money</i><p>{element.getPrice()}</p>
                            </Card.Text>
                            <Card.Text className = "attribute">
                            <i className = "material-icons">category</i><p>{element.getCategory().getName()}</p>
                            </Card.Text>
                            <Button className = "btn-product-card" 
                            onClick = {(e:any)=> {this.props.chooseProduct(element)}}>
                                Select Product</Button>
                        </Card.Body>
                    </Card> 
                    </> )
                    }) : <p className = "loadingNoResults">No Products Found</p> }
                </div>


            <div className = "my-events-pagination-bottom">   
            <>
            <div className = "pagination-left">
                    <a href = '#' className = {(this.state.dataPagination.isFirstPage()) ? "pagination-disabled" : ""}
                    onClick={this.goBackClick}><i className = "material-icons large" style = {{fontSize: '50px'}}>arrow_back</i></a>
                </div>
                <ul>
                    {this.createPagination()}
                </ul>
            </>
            <div className = "pagination-right">
                    <a href = '#' className = {(this.state.dataPagination.isLastPage()) ? "pagination-disabled" : ""}
                    onClick={this.goForwardClick}><i className = "large material-icons" style = {{fontSize: '50px'}}>arrow_forward</i></a>
                </div>
            </div>
            </div>
        </>
        )
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
    chooseProduct : chooseProduct,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);