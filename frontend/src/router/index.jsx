import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

import Layout from '../components/Layout';
import paths from './paths';
import Activation from '../pages/Activation';

const Router = () => {
  return (
    <Layout>
      <Switch>
        <Route path={paths.HOME} exact>
          <Home />
        </Route>
        <Route path={paths.ACTIVATION}>
          <Activation />
        </Route>
        <Route path={paths.DEFAULT}>
          <Redirect to={paths.HOME} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Router;
