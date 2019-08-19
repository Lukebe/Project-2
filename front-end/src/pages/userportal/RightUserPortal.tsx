import React, { Component } from 'react';
import Navigation from './Navigation';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Search from './Search';
import MyJobs from './MyJobs';
import SearchCategory from './SearchCategory';
import MyJobView from './MyJobView';
import ByStatus from './ByStatus';
import { AcceptJobView } from './SearchJobModal2';

export default class RightUserPortal extends Component <any, any>{

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Navigation />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/userportal/search" component={Search} />
                        <Route exact path="/userportal/search/category" component={SearchCategory} />
                        <Route exact path="/userportal/myjobs" component={MyJobs} /> 
                        <Route exact path="/userportal/jobview" component={MyJobView} />
                        <Route exact path="/userportal/byStatus" component={ByStatus} />
                        <Route exact path="/userportal/acceptJob" component={AcceptJobView} />
                </div>
            </BrowserRouter>      
        );
    }
}
