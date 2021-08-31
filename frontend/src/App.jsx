import React from 'react';

import logo from './logo.svg';
import classes from './App.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <p>home page</p>
        </Route>
        <Route path='/react'>
          <div className={classes.App}>
            <header className={classes['App-header']}>
              <img src={logo} className={classes['App-logo']} alt='logo' />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className={classes['App-link']}
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </>
  );
}

export default App;
