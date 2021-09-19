import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import paths from './paths';

const Router = () => {
  return (
    <Layout>
      <Switch>
        <Route path={paths.HOME} exact>
          <p>home page</p>
        </Route>
        <Route path={paths.DEFAULT}>
          <Redirect to={paths.HOME} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Router;
