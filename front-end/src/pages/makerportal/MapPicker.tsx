import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState } from '../../reducers';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import { Modal } from "react-bootstrap";
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful : () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    isFetching : boolean;
}
type IProps = IComponentProps & IAuthProps;
class MapPicker extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    render() {
        return (
            <Modal show animation>
                <Modal.Header><h2>Map Picker</h2></Modal.Header>
                <Modal.Body>
<p>Map Picker in Progress</p> 
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
export default connect(mapStateToProps, mapDispatchToProps)(MapPicker);
