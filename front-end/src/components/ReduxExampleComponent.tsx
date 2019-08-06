import React, {Component} from 'react';
//Import interfaces from reducers
import { IAppState, IAuthState } from '../reducers';
//Import action creators you want to reference
import { loginSuccessful, toggleAuthStatus,
     authTimerTick} from '../actions/Authentication.action';
//Import connect function from redux, this connects global store to component.
import { connect } from 'react-redux';

interface IState {
}
//Props interface for component. Defines the variables you want from the global store to be accessed via this.props
//At least one interface is necessary to implement redux.
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    loginSuccessful: (dataObj : object) => void;
    toggleAuthStatus: () => void;
}
export class ReduxExampleComponent extends Component<IAuthProps,IState> {
    state : IState = {
    } 
    render() { 
        return (
            <>
            {//Returns email from auth.userProfile in redux state
            }
            <p>{this.props.auth.userProfile.email}</p>
            </>
        );
    
    }
}
/**
 * * The following three blocks of code are absolutely necessary to include redux in a component 
 */
//This maps global state to props
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful: loginSuccessful,
    toggleAuthStatus: toggleAuthStatus,
    authTimerTick: authTimerTick,
}
export default connect(mapStateToProps, mapDispatchToProps)(ReduxExampleComponent);
