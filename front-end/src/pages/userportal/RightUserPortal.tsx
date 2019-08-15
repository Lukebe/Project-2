import React, { Component } from 'react';
import Navigation from './Navigation';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Search from './Search';
import MyJobs from './MyJobs';
import SearchCategory from './SearchCategory';

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
                        <Route exact path="/userportal/jobview" />
                </div>
            </BrowserRouter>      
        );
    }
}
