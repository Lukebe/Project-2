import { IAuthState, IAppState, IProductPickerState } from "../reducers";
import { Modal, Tabs, Tab, Nav, Col } from "react-bootstrap";
import React from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import './ProductPicker.css'
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    productPicker: IProductPickerState,
    //Action creators from the dispatcher
}
export interface IComponentProps {
    callback: Function;

}
interface IState {
    isFetching : boolean;
    productId: number;
}
type IProps = IComponentProps & IAuthProps;
class ProductPicker extends React.Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            productId: 0,
        };
    }
    updateCallback = (productId : number) =>{
      this.setState({...this.state, productId : productId});
      this.props.callback(productId);
    }
    componentWillReceiveProps(props: any){
        if(this.props.productPicker.product !== props.productPicker.product){
            this.updateCallback(this.props.productPicker.product.getProductId());
        }
    }

    render() {
        return (
            <Modal className = "product-picker-modal" size="lg" show animation keyboard 
            onHide = {() => this.props.callback(this.state.productId)}>
          <Modal.Header><i className="large material-icons"></i>
                <h2> Login </h2>  <i className="large material-icons" onClick = {(e : any) => this.updateCallback(this.state.productId)}>close</i>
                </Modal.Header>
                <Modal.Body>
                <Tab.Container defaultActiveKey="list" transition = {false} id="product-selection-tabs">
                <Nav justify variant="pills">
                    <Col sm = {12} lg = {6}>
                        <Nav.Item className = 'product-selection-tab'>
                            <Nav.Link as = "a" eventKey="list">Find Product</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm = {12} lg = {6}>
                        <Nav.Item className = 'product-selection-tab'>
                            <Nav.Link as = "a" eventKey="create">Create Product</Nav.Link>
                        </Nav.Item>
                    </Col>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="list">
                        <ProductList/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="create">
                        <CreateProduct/>
                    </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductPicker);
