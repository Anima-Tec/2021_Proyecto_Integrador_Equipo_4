import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/UI/Login';
import './index.module.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Login />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
