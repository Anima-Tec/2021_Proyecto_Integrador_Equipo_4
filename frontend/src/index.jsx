import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import './index.module.scss';
import Router from './router';
import ViewMyDonations from './components/ViewMy/ViewMyDonations/index.jsx'

ReactDOM.render(
  <ToastProvider>
    <BrowserRouter>
      <ViewMyDonations />
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById('root')
);
