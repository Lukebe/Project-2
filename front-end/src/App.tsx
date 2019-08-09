import React from 'react';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Landing from './pages/Landing';
<<<<<<< HEAD
import Login from './pages/Login';
import UserPortal from './pages/userportal/UserPortal';
=======
import PostJob from './pages/PostJob';
import Login from './pages/account/Login';
import UserPortal from './pages/UserPortal';
>>>>>>> c2bbfcb0ab8510009672514ba67562800d6757d3
import store from './Store';
import { Provider } from 'react-redux';
import JobsCreated from './pages/makerportal/JobsCreated';
import { MakerPortal } from './pages/makerportal';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {
            /* Insert routes here using <Route exact path = "" component = {}> 
              This should be the only switch in the application.
            */
          }
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/userportal" component={UserPortal} />
          <Route exact path = "/" component={Landing} />  
           <Route exact path="/postJob" component={PostJob} />
          <Route exact path = "/login" component={Login} />  
          <Route exact path = "/makerportal" component = {MakerPortal} />
          <Route exact path = "/userportal" component={UserPortal} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
