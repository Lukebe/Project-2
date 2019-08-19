/*
* The following consts are a list of redux actions that are passed to the reducers. These can
be named anything, but in this example are the same name as their respective functions but 
in capitals instead of camelCase.
*/
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const TOGGLE_AUTH_STATUS = 'TOGGLE_AUTH_STATUS';
export const SET_REDIRECT = 'SET_REDIRECT';
export const START_REDIRECT = 'START_REDIRECT';
export const FINISH_REDIRECT = 'FINISH_REDIRECT';
export const LOGOUT = 'LOGOUT';
/* The following functions are directly called as "action creators" in the code. The one below would be referred by
this.props.loginSuccessful in a component. The purpose of these functions is to "dispatch" actions. These actions are
defined as the constants above ^. An action creator will always dispatch an object with a property of "type", which contains
the action it wants to create. 
* Optionally, some data can be passed with the action to be handled by the reducer. This is defined
as the property "payload". This can be seen in loginSuccessful(), and payload is usually an object. Functions with a
payload must be defined like the function below, with one parameter (in this case, data).
*/
export const loginSuccessful = (data: any) => (dispatch: any) => {
    dispatch({
        payload: data,
        type: LOGIN_SUCCESSFUL
    });
}
export function toggleAuthStatus() {
  return { type: TOGGLE_AUTH_STATUS }
}
export const setRedirect = (route: string) => (dispatch: any) => {
    dispatch({
        payload: {route},
        type: SET_REDIRECT,
    })
}
export const startRedirect = () => (dispatch: any) => {
    dispatch({type: START_REDIRECT });
}
export function finishRedirect() {
    return { type: FINISH_REDIRECT }
}
export function logout() {
  return {type: LOGOUT}
}
//This is an example of an action creator that is asynchronous. Asynchronous redux functions are handled
//by redux thunk and return an asynchronous dispatch function.
export function authTimerTick(){
  let token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
  return async (dispatch : any) => {
    dispatch(//function name
    );
  }
}