import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.module.scss';
import Router from './router';
import MisDonaciones from './components/Administrar/MisDonaciones/index.jsx'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MisDonaciones />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
