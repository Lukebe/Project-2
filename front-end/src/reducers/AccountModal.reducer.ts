//Importing the "actions"
import {
    OPEN_FORGET_PASSWORD,
    OPEN_LOGIN,
    OPEN_SIGNUP,
    IS_LOGGED_IN,
    CLOSE_MODAL,
  } from '../actions/AccountModal.action';
  import {IAccountState} from './index';
export enum AccountModalType {
    NONE,
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
    IS_LOGGED_IN,
}
//This defines the initial state in redux. It defines the state according to the interface it is based upon.
//In this case, IAuthState is defined in /reducers/index.ts. The initial state is the state that the application
//should have when the program begins and before any actions are called.
const initialState : IAccountState = {
    selectedModal : 0
}
  //This is an example of a reducer. This reducer, authReducer is designed to catch any actions that have to do
  //with authentication. It is called by the dispatch function, which is inside the action creators. It consists of
  //a switch statement which catches certain actions and modifies the state based upon the action.
  //* It is important to note that reducers are pure functions and state modification SHOULD BE the only thing happening
  //within the reducer function.
  export const accountModalReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case OPEN_FORGET_PASSWORD:
          return { ...state, selectedModal: AccountModalType.FORGOT_PASSWORD}
        case OPEN_LOGIN:
            return {...state, selectedModal: AccountModalType.LOGIN }
        case OPEN_SIGNUP:
            return {...state, selectedModal: AccountModalType.SIGNUP }
        case IS_LOGGED_IN:
            return {...state, selectedModal: AccountModalType.IS_LOGGED_IN }
        case CLOSE_MODAL:
            return {...state, selectedModal: AccountModalType.NONE }
        default: break;

    }
    return state;
}