import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import './index.module.scss';
import Router from './router';
import ConfirmarDonacion from './components/Donaciones/ConfirmarDonacion/index';

ReactDOM.render(
  <ToastProvider>
    <BrowserRouter>
      <Router />
      <ConfirmarDonacion>
        <button>Abrir</button>
      </ConfirmarDonacion>
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById('root')
);
