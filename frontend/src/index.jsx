import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.module.scss';
import App from './App';
import Register from './components/login/Register';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Register />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
