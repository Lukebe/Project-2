import { IAuthState, IAppState } from "../reducers";
import { Modal } from "react-bootstrap";
import React from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful : () => void;
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

    render() {
        return (
            <Modal size="lg" show animation keyboard 
            onHide = {() => this.props.callback(this.state.productId)}>
          <Modal.Header closeButton><h2>Product Portal</h2></Modal.Header>
                <Modal.Body>
                    Product picker in progress
                </Modal.Body> 
            </Modal>     )
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductPicker);