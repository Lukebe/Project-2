//Importing the "actions"
import {
    MY_JOBS_REFRESH,
    NEW_JOBS_POPULATE,
    NEW_JOBS_RESET,
    MY_JOBS_DONE_REFRESH
  } from '../actions/MakerPortal.action';
  import {IAccountState, IMakerPortalState} from './index';
//This defines the initial state in redux. It defines the state according to the interface it is based upon.
//In this case, IAuthState is defined in /reducers/index.ts. The initial state is the state that the application
//should have when the program begins and before any actions are called.
const initialState : IMakerPortalState = {
    needsRefresh : false,
    formFields: {
    productlocation: {
        value: ''
      },
      dropofflocation: {
          value: ''
      },
      product: {
        value: ''
      },
      jobdate : {
          value: ''
      },
      jobhour: {
          value: ''
      },
      jobminute: {
          value: ''
      },
      jobpay: {
        value: ''  
      },
      description : {
          value: ''
      },
      category: {
          value: 'Choose a category...'
      },
      timeEstimateHour: {
          value: ''
      },
      timeEstimateMinute: {
          value: ''
      }
    }
}
  //This is an example of a reducer. This reducer, authReducer is designed to catch any actions that have to do
  //with authentication. It is called by the dispatch function, which is inside the action creators. It consists of
  //a switch statement which catches certain actions and modifies the state based upon the action.
  //* It is important to note that reducers are pure functions and state modification SHOULD BE the only thing happening
  //within the reducer function.
  export const makerPortalReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case MY_JOBS_REFRESH:
          return { ...state, needsRefresh: true}
        case MY_JOBS_DONE_REFRESH:
            return {...state, needsRefresh: false }
        case NEW_JOBS_POPULATE:
            return {...state, formFields: {...state.formFields, [action.payload.name]: {value: action.payload.value}} }
        case NEW_JOBS_RESET:
            return {...state, formFields: initialState.formFields }
        default: break;

    }
    return state;
}