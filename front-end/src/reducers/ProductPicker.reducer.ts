//Importing the "actions"
import {
    CHOOSE_PRODUCT, RESET_PRODUCT,
} from '../actions/ProductPicker.action';
import { IProductPickerState } from '.';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
//This defines the initial state in redux. It defines the state according to the interface it is based upon.
//In this case, IAuthState is defined in /reducers/index.ts. The initial state is the state that the application
//should have when the program begins and before any actions are called.
const initialState : IProductPickerState = {
    product : new Product({productId: 0, description: '', itemName: '',
    imageUrl: '', category: new Category({categoryId: 0, name: '', description: ''}),
    price: 0}),
        
}
  //This is an example of a reducer. This reducer, authReducer is designed to catch any actions that have to do
  //with authentication. It is called by the dispatch function, which is inside the action creators. It consists of
  //a switch statement which catches certain actions and modifies the state based upon the action.
  //* It is important to note that reducers are pure functions and state modification SHOULD BE the only thing happening
  //within the reducer function.
  export const productPickerReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case CHOOSE_PRODUCT:
          return { ...state, product: action.payload.product }
        case RESET_PRODUCT:
            return { ...state, product: initialState.product }
        default: break;
    }
    return state;
}