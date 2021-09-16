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

  const submitHandler = async (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const surName = surNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    let response;

    if (password === confirmPassword) {
      try {
        response = await fetchController(TYPE.REGISTER, {
          name,
          surname: surName,
          email,
          password,
        });

        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  return (
    <Popup className={classes.content} trigger={children} modal>
      {(close) => (
        <div className={classes.modal}>
          <button className={classes.close} onClick={close}>
            &times;
          </button>

          <div className={classes['register-header']}>
            <p className={classes.title}>¡Registrate!</p>
          </div>

          <div className={classes['register-body']}>
            <form className={classes['register-form']} onSubmit={submitHandler}>
              <label className={classes['register-label']} htmlFor='name'>
                Nombre
                <span className={classes['register-required']}>
                  {' '}
                  (requerido)
                </span>
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
                <span className={classes['register-required']}>
                  {' '}
                  (requerido)
                </span>
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
                <span className={classes['register-required']}>
                  {' '}
                  (requerido)
                </span>
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
                <span className={classes['register-required']}>
                  {' '}
                  (requerido)
                </span>
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

              <span className={classes['register-question']}>
                ¿Ya tienes cuenta?
                <a
                  className={classes['link-to-login']}
                  href='(insertar ruta del login)'
                >
                  {' '}
                  Inicia sesión
                </a>
              </span>

              <button className={classes['register-button']} type='submit'>
                Registrarse
              </button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};
export default Register;
