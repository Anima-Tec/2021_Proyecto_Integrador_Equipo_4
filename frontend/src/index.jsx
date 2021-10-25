import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import './index.module.scss';
import Router from './router';

ReactDOM.render(
  <ToastProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById('root')
);
