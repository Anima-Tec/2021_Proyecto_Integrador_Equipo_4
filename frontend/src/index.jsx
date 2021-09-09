import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.module.scss';
import App from './App';
import Registro from './components/login/Registro';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Registro />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
