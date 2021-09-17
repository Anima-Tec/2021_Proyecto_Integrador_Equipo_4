import classes from './Login.module.scss';
import React from 'react';
import Popup from 'reactjs-popup';
import logo from './../../assets/images/logo.png';

const LoginHandler = (event) => {
  event.preventDefault();
};

const Login = ({ children }) => (
  <Popup trigger={children} modal className={classes['popup-content']}>
    <div className={['login-container']}>
      <div className={classes['welcome-container']}>
        <h4>Bienvenido</h4>
      </div>
      <div className={classes['logo-container']}>
        <img src={logo} alt='brakadevi_logo' />
        <p className={classes['brak']}>brak</p>
        <p className={classes['adevi']}>adevi</p>
      </div>
      <form onSumbit={LoginHandler} className={classes['info-container']}>
        <p>Email</p>
        <input type='email' placeholder='Ingrese su email' required></input>
        <p>Contraseña</p>
        <input
          type='password'
          placeholder='Ingrese su contraseña'
          minLength='8'
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
  </Popup>
);

export default Login;
