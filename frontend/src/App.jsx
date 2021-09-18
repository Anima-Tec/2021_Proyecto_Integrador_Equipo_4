import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import classes from './App.module.scss';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path='/' exact>
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
      </Layout>
    </>
  );
};

export default App;
