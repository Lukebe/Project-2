
import axios from 'axios';
import config from '../config.json';
export enum RequestState {
        FETCHING,
        SUCCESSFUL,
        ERROR,
        NOT_ACTIVE,
}
/**
 * Used to send a GET request to the API
 * @param route URI to be called after location specified in config. Example (http://localhost:3000/route).
 * @returns Axios response data. Either returned as Error class or javascript Object.
 */
const GET = async (route: string = '/', token : string) => {
    let requestConfig : any = {
        headers: {
          common: {
            Authorization: "Bearer " + (token),
            }
          }
        }
    const responseData = await axios.get(config.backend.serverURL + route,requestConfig)
        .then((response :any) => { return response} )
        .catch((error) => { return error.response });
    return throwErrorOrReturn(await responseData);
}
/**
 * Used to send a POST request to the API
 * @param route URI to be called after location specified in config. Example (http://localhost:3000/route).
 * @param data Javascript object that is send in request.body. Ex: {username: 'user', password: 'pass'}
 * @returns Axios response data. Either returned as Error class or javascript Object.
 */
const POST = async (route: string = '/', data : any = {}, token : string = '') => {
    let requestConfig : any = {
        headers: {
          common: {
            Authorization: "Bearer " + (token),
            }
          }
        }
    if(route === '/users/login' || route === '/users') { requestConfig = {}}
    const responseData =  await axios.post(config.backend.serverURL + route, data, requestConfig)
        .then((response :any) => { return response} )
        .catch((error) => { return error.response });
    return throwErrorOrReturn(await responseData);
}
/**
 * Used to send a PATCH request to the API
 * @param route URI to be called after location specified in config. Example (http://localhost:3000/route).
 * @param data Javascript object that is send in request.body. Ex: {name: 'me', email: 'example'}
 * @returns Axios response data. Either returned as Error class or javascript Object.
 */
const PATCH = async (route: string = '/', data : any = {}, token : string) => {
    let requestConfig : any = {
        headers: {
          common: {
            Authorization: "Bearer " + (token),
            }
          }
        }
    const responseData =  await axios.patch(config.backend.serverURL + route, data, requestConfig)
        .then((response :any) => { return response})
        .catch((error) => { return error.response });

}
//This function checks the response status code (ex 201) and returns an error if
//it is not 200 or 201. If it is 200 or 201, returns the response data.
const throwErrorOrReturn = (dataResponse : any) => {
  if(!dataResponse){
    return new Error(config.messages.noServerResponse);
  }
  switch(dataResponse.status){
    case 400:
        return new Error(config.messages.badRequest);
    case 401:
        return new Error(config.messages.noAccess);
    case 403:
        return new Error(config.messages.badToken);
    case 404:
        return new Error(config.messages.notFound);
    case 500:
        return new Error(config.messages.internalServerError);
    default:
        console.log(dataResponse);
        return dataResponse.data;
  }
}

export {GET, POST, PATCH};