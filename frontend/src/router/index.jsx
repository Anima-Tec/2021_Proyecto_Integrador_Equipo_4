import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

import paths from './paths';
import Activation from '../pages/Activation';
import CommonRoute from './CommonRoute';

const Router = () => {
  return (
    <Switch>
      <CommonRoute path={paths.HOME} exact component={Home} />
      <Route path={paths.ACTIVATION} component={Activation} />
      <Route path={paths.DEFAULT}>
        <Redirect to={paths.HOME} />
      </Route>
    </Switch>
  );
};

export default Router;
