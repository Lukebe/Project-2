import { IAuthState, IAppState } from "../reducers";
import { Modal } from "react-bootstrap";
import React from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";
export interface IProps {
    callback: Function;
    imageUrl: string;
}
export default class ImageModal extends React.Component <IProps,{}>{

    constructor(props: any) {
        super(props);
    }
    updateCallback = (productId : number) =>{
      this.setState({...this.state, productId : productId});
      this.props.callback(productId);
    }

    render() {
        return (
            <Modal size="lg" show animation keyboard className = "image-viewer-modal"
            onHide = {() => this.props.callback()}>
          <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img className = "image-viewer-modal-image" src = {this.props.imageUrl}/>
                </Modal.Body> 
            </Modal>     
            )
    }
}