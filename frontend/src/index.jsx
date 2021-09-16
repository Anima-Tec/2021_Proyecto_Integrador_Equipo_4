import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.module.scss';
import App from './App';
import Home from './components/Layout/Home/Home';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Home />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
