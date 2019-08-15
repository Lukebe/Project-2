import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState } from '../../reducers';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import * as APICall from '../../utils/APICall';
import { Job } from "../../models/Job";
const RequestState = APICall.RequestState;
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
    data : Job[];
}
type IProps = IComponentProps & IAuthProps;
class PopularEvents extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            data: [],
        };
    }
    componentDidMount() {
        this.handleRequest();
    }
    async handleRequest() {
        const response = await APICall.GET('/jobs/usercreated/' + this.props.auth.userProfile.getUserId()
        ,this.props.auth.userProfile.getToken());
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        if(await response instanceof Error){

        } else {
            let responseArray = response.content;
            console.log(response.content);
            let jobsArray : Job[] = responseArray.map((element:any, index: number)=>{
                return new Job(element);
            })
            this.setState({data: jobsArray})
        }
        console.log(await response);
    }

    render() {
        return (
            <>
            <h2>My Events</h2><>
            {(this.state.data[0]) ? this.state.data.map((element: Job) => {

                return (
                <>
                <p>JobId: {element.getJobId()}</p>
                <p>User Created: {element.getUserCreated().getFullName()}</p>
                <p>Description: {element.getDescription()}</p>
                </> )
            }) : <p>No Results</p>}</>
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(PopularEvents);
