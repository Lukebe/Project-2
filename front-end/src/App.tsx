import React from 'react';
import './App.css';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Landing from './pages/Landing';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        {
          /* Insert routes here using <Route exact path = "" component = {}> 
            This should be the only switch in the application.
          */
        }
        <Route exact path = "/" component={Landing} />   
      </Switch>
    </HashRouter>
  );
}

export default App;
