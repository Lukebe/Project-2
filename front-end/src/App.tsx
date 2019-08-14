import React from 'react';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import PostJob from './pages/PostJob';
import UserAccount from './components/userAccount';
import Login from './pages/account/Login';
import UserPortal from './pages/userportal/UserPortal';
import store from './Store';
import { Provider } from 'react-redux';
import MakerPortal from './pages/makerportal';

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
          <Route exact path="/postJob" component={PostJob} />
          <Route exact path="/userAccount" component={UserAccount} />
          <Route exact path="/makerportal" component={MakerPortal} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
