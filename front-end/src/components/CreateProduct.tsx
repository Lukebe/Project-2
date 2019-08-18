import { IAuthState, IAppState } from "../reducers";
import { Modal, Tabs, Tab } from "react-bootstrap";
import React from 'react';
import { loginSuccessful } from "../actions/Authentication.action";
import { connect } from "react-redux";

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
}
export interface IComponentProps {

}
interface IState {
}
type IProps = IComponentProps & IAuthProps;
class CreateProduct extends React.Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (<></>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
