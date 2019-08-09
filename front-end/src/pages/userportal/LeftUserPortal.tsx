import React, { Component } from 'react';
import * as APICall from '../../utils/APICall';
import ActiveJobs from './ActiveJobs';

export default class LeftUserPortal extends Component <any, any>{

    componentDidMount(){
        
    }


    async handleRequest() {
        const response = await APICall.GET('/');
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        const message = await response instanceof Error ? response.message : response;
        alert(message);

        //if(response instanceof Error){
        //    alert(response.message);
        //} else {
        //    alert(response);
        //}
    }

    render() {
        return(
            <div>
                <React.Fragment>
                    <h3>Active Jobs</h3> 
                    <ActiveJobs />
                </React.Fragment>
            </div>
        );
    }
}
