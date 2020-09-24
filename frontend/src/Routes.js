import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnimatedRoute from './components/AnimatedRoute';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

function App() {
  return (
    <Switch>
      <AnimatePresence exitBeforeEnter>
        <AnimatedRoute path="/login" component={LoginPage}></AnimatedRoute>
        <AnimatedRoute
          path="/register"
          component={RegisterPage}
        ></AnimatedRoute>
        <Redirect to="/login"></Redirect>
      </AnimatePresence>
    </Switch>
  );
}

export default App;
