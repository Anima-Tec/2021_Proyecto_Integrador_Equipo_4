import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.module.scss';
import Router from './router';
import ConfirmarDonacion from './components/Donaciones/ConfirmarDonacion/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
      <ConfirmarDonacion>
        <button>Abrir</button>
      </ConfirmarDonacion>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
