import { combineReducers } from "redux";
import { authReducer } from "./Authentication.reducer";
import { accountModalReducer, AccountModalType } from "./AccountModal.reducer";
import { User } from "../models/User";
import { makerPortalReducer } from "./MakerPortal.reducer";
import { productPickerReducer } from "./ProductPicker.reducer";
import { Product } from "../models/Product";

//This is the IAuthState interface defined in the Authentication reducer. This defines the structure
//of the gloabl authentication state. The initial state in Authentication reducer follows the exact
//format below.
export interface IAuthState {
    lostConnection: boolean,
    userProfile : User,
    isFetching : boolean,
    redirect: {
        readyToRedirect : boolean,
        route: string,
    }
};
export interface IMakerPortalState {
    needsRefresh: boolean,
    formFields: any;
    newJobOpen : boolean;
};
export interface IAccountState {
    selectedModal : AccountModalType
};
export interface IProductPickerState {
    product: Product;
}

//Access to authorization information should be state.auth....
//User data: state.auth.userData
//This is the overall global state interface used by redux. It is comprised of properties that implement other
//interfaces. In this case, we assign the property "auth" to implement IAuthState interface. This directly translates
//to how components interact with the global redux store. In the component, to access the authentication store, you would
//use this.state.auth. Other properties can be added in here and be accessed in components like: this.props.propertyName
export interface IAppState {
    auth: IAuthState,
    accountModal : IAccountState,
    makerPortal: IMakerPortalState,
    productPicker: IProductPickerState,
}
//This combines all the different reducers into a global state variable. This variable is then passed to the store (in Store.ts)
//and becomes the global state.
export const state = combineReducers<IAppState>({
    auth: authReducer,
    accountModal : accountModalReducer,
    makerPortal: makerPortalReducer,
    productPicker: productPickerReducer,
})
