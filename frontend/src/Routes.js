import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnimatedRoute from './components/AnimatedRoute';
import Layout from './components/Layout';
import Dashboard from './containers/Dashboard';
import LoginPage from './containers/LoginPage';
import RechargePage from './containers/RechargePage';
import RegisterPage from './containers/RegisterPage';

function Routes() {
  const user = useSelector((state) => state.session.user);
  return user ? <AuthRoutes /> : <UnauthRoutes />;
}

function UnauthRoutes() {
  return (
    <Switch>
      <AnimatePresence>
        <AnimatedRoute
          path="/login"
          component={LoginPage}
          key="login"
        ></AnimatedRoute>
        <AnimatedRoute
          path="/register"
          component={RegisterPage}
          key="register"
        ></AnimatedRoute>
      </AnimatePresence>
      <Redirect to="/login"></Redirect>
    </Switch>
  );
}

function AuthRoutes() {
  return (
    <Layout>
      <Switch>
        <AnimatePresence>
          <AnimatedRoute
            path="/dashboard"
            key="dashboard"
            exact
            component={Dashboard}
          ></AnimatedRoute>
          <AnimatedRoute
            path="/recharge"
            exact
            key="dashboard"
            component={RechargePage}
          ></AnimatedRoute>
        </AnimatePresence>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </Layout>
  );
}

export default Routes;
