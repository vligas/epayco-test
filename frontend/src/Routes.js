import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import AnimatedRoute from './components/AnimatedRoute';
import Layout from './components/Layout';
import Dashboard from './containers/Dashboard';
import LoginPage from './containers/LoginPage';
import PayPage from './containers/PayPage';
import RechargePage from './containers/RechargePage';
import RegisterPage from './containers/RegisterPage';
import { refreshUserInfo } from './redux/reducers/session';

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
        <Redirect to="/login"></Redirect>
      </AnimatePresence>
    </Switch>
  );
}

function AuthRoutes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUserInfo());
  }, [dispatch]);
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
            key="recharge"
            component={RechargePage}
          ></AnimatedRoute>
          <AnimatedRoute
            path="/pay"
            exact
            key="pay"
            component={PayPage}
          ></AnimatedRoute>
          <Redirect to="/dashboard"></Redirect>
        </AnimatePresence>
      </Switch>
    </Layout>
  );
}

export default Routes;
