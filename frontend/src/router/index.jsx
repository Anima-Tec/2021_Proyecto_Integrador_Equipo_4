import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import paths from './paths';
import Activation from '../pages/Activation';
import CommonRoute from './CommonRoute';
import Donation from '../pages/Donation';
import ViewMy from '../pages/ViewMy';
import Home from '../pages/Home';
import EditPot from '../pages/EditPot';

const Router = () => {
  return (
    <Switch>
      <CommonRoute path={paths.HOME} exact component={Home} />
      <CommonRoute path={paths.DONATE_POT} component={Donation} />
      <CommonRoute path={paths.VIEW_MY} exact component={ViewMy} />
      <CommonRoute path={paths.EDIT_POT} component={EditPot} />
      <Route path={paths.ACTIVATION} exact component={Activation} />
      <Route path={paths.DEFAULT}>
        <Redirect to={paths.HOME} />
      </Route>
    </Switch>
  );
};

export default Router;
