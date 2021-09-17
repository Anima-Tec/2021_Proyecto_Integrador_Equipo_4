import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.module.scss';
import App from './App';
<<<<<<< HEAD
import Home from './components/Home/Home';
=======
>>>>>>> ccbbdaaf7585c663407d03c2277301323f1f2da7

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Home />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
