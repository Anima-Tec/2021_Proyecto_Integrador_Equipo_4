import classes from './Login.module.scss';
import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import logo from './../../assets/images/logo.png';
import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';

const Login = ({ children, login }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const LoginHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    let response;

    try {
      response = await fetchController(TYPE.LOGIN, { email, password });
    } catch (error) {
      return alert('Error desconocido.');
    }

    if (response.status === 200) {
      localStorage.setItem('userIdentifier', true);
      const token = localStorage.getItem('userIdentifier');
      login(token);
    } else {
      alert('Email o contraseña invalidos.');
    }
  };

  return (
    <Popup trigger={children} modal className={classes['popup-content']}>
      {(close) => (
        <div className={['login-container']}>
          <button className={classes.close} onClick={close}>
            &times;
          </button>
          <div className={classes['welcome-container']}>
            <h4>Bienvenido</h4>
          </div>
          <div className={classes['logo-container']}>
            <img src={logo} alt='brakadevi_logo' />
            <p className={classes['brak']}>brak</p>
            <p className={classes['adevi']}>adevi</p>
          </div>
          <form onSubmit={LoginHandler} className={classes['info-container']}>
            <p>Email</p>
            <input
              type='email'
              ref={emailInputRef}
              placeholder='Ingrese su email'
              required
            ></input>
            <p>Contraseña</p>
            <input
              type='password'
              placeholder='Ingrese su contraseña'
              minLength='8'
              ref={passwordInputRef}
              required
            ></input>
            {/* <span>
          <a
          href='http://localhost:3000/'
          target='_blank'
          rel='noreferrer'
          className={classes['reset-passw']}
          >
          No tienes cuenta? Registrate
          </a>
          <a
          href='http://localhost:3000/'
          target='_blank'
          rel='noreferrer'
          className={classes['reset-passw']}
          >
          Olvidé mi contraseña
          </a>
        </span> */}
            <button type='sumbit'>Entrar</button>
          </form>
        </div>
      )}
    </Popup>
  );
};
export default Login;
