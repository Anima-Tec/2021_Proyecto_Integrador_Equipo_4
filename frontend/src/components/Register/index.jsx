import { Animated } from 'react-animated-css';
import React, { useRef } from 'react';
import Popup from 'reactjs-popup';

import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';
import classes from './Register.module.scss';

const Register = ({ children }) => {
  const nameInputRef = useRef();
  const surNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const PopUpRef = useRef();

  const closePopup = () => {
    PopUpRef.current.close();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const surName = surNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    let response;
    let activateResponse;

    if (password === confirmPassword) {
      try {
        response = await fetchController(TYPE.REGISTER, {
          name,
          surname: surName,
          email,
          password,
        });
        console.log(response);
        if (response.status === 200) {
          const token = prompt(
            'Un código fue enviado a tu correo, confirma tu cuenta ingresándolo.'
          );

          const email = emailInputRef.current.value;

          try {
            activateResponse = await fetchController(TYPE.ACTIVATE_ACCOUNT, {
              email,
              token,
            });
          } catch (error) {
            alert(
              'Token incorrecto, intenta registrarte de nuevo en 5 minutos.'
            );
          }

          if (activateResponse.status === 200) {
            alert('Registrado correctamente');
            PopUpRef.current.close();
          }
        }
      } catch (error) {
        return error;
      }
    } else {
      return alert('Las contraseñas deben ser iguales.');
    }
  };

  return (
    <Popup
      ref={PopUpRef}
      closeOnDocumentClick={false}
      className={classes.content}
      trigger={children}
      modal
    >
      <div className={classes.modal}>
        <button className={classes.close} onClick={closePopup}>
          &times;
        </button>
        <div className={classes['register-header']}>
          <h4 className={classes.title}>¡Registrate!</h4>
        </div>
        <div className={classes['register-body']}>
          <form className={classes['register-form']} onSubmit={submitHandler}>
            <label className={classes['register-label']} htmlFor='name'>
              Nombre
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              type='text'
              placeholder='Nombre'
              id='name'
              ref={nameInputRef}
              required
            />

            <label className={classes['register-label']} htmlFor='surname'>
              Apellido
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              type='text'
              placeholder='Apellido'
              id='surname'
              ref={surNameInputRef}
              required
            />

            <label className={classes['register-label']} htmlFor='email'>
              Email
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              type='email'
              placeholder='Email'
              id='email'
              ref={emailInputRef}
              required
            />

            <label className={classes['register-label']} htmlFor='password'>
              Contraseña
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              type='password'
              placeholder='Contraseña'
              id='password'
              minLength='8'
              ref={passwordInputRef}
              required
            />
            <input
              className={classes['register-input']}
              type='password'
              placeholder='Confirmar Contraseña'
              id='confmirmPassword'
              minLength='8'
              ref={confirmPasswordInputRef}
              required
            />

            <button className={classes['register-button']} type='submit'>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
};

export default Register;
