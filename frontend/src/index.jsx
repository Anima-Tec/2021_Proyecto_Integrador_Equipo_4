import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.module.scss';
import App from './App';
 // eslint-disable-next-line
import Register from './components/Login/Register';
import CrearOllas from './components/ollas/crear-ollas';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <CrearOllas />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
