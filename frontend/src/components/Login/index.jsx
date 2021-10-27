import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useToasts } from 'react-toast-notifications';

import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';
import Spinner from '../UI/Spinner';
import logo from './../../assets/images/logo.png';
import classes from './Login.module.scss';

const Login = ({ children, login }) => {
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const PopupRef = useRef();

  const setFormDataHandler = (event) => {
    const value = event.target.value;
    const inputId = event.target.id;
    setFormData((prevState) => ({ ...prevState, [inputId]: value }));
  };

  const closePopupHandler = () => {
    PopupRef.current.close();
  };

  const LoginHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    setLoading(true);

    const response = await fetchController(TYPE.LOGIN, { email, password });

    if (response.status === 200) {
      localStorage.setItem('userIdentifier', response.data.access_token);
      localStorage.setItem('email', email);
      const token = localStorage.getItem('userIdentifier');

      PopupRef.current.close();

      login(token);
      setLoading(false);
    }

    if (response.status === 401) {
      addToast('Email o contraseña invalidos.', {
        appearance: 'error',
        autoDismiss: '4000',
      });
      setLoading(false);
    }
  };

  return (
    <Popup
      ref={PopupRef}
      closeOnDocumentClick={false}
      trigger={children}
      modal
      className={classes['popup-content']}
    >
      {loading && <Spinner />}
      <div className={['login-container']}>
        <button className={classes.close} onClick={closePopupHandler}>
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
            placeholder='Ingrese su email'
            id='email'
            onChange={setFormDataHandler}
            required
          ></input>
          <p>Contraseña</p>
          <input
            type='password'
            placeholder='Ingrese su contraseña'
            minLength='8'
            id='password'
            onChange={setFormDataHandler}
            required
          ></input>
          <button type='sumbit'>Entrar</button>
        </form>
      </div>
    </Popup>
  );
};
export default Login;
