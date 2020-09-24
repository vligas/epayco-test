import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';

function App() {
  return (
    <Switch>
      <Route path="/">
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default App;
