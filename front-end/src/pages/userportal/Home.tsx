import React, { Component } from 'react';
import Featured from './Featured';


export default class LeftUserPortal extends Component <any, any>{


    render() {
        return(
            <React.Fragment> 
                <h1>Featured</h1>
                <Featured />
            </React.Fragment>
        );
    }
}