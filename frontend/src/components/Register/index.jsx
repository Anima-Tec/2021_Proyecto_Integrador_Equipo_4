import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useToasts } from 'react-toast-notifications';

import Spinner from '../UI/Spinner';
import paths from '../../router/paths';
import TYPE from '../../Networking/requestTypes';
import fetchController from '../../Networking/fetch-controller';
import classes from './Register.module.scss';

const Register = ({ children }) => {
  const { addToast } = useToasts();
  const PopUpRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const closePopup = () => {
    PopUpRef.current.close();
  };

  const updateFormData = (event) => {
    const value = event.target.value;
    const inputId = event.target.id;
    setFormData((prevState) => ({ ...prevState, [inputId]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { name, surname, email, password, confirmPassword } = formData;

    if (password === confirmPassword) {
      setLoading(true);

      const response = await fetchController(TYPE.REGISTER, {
        name,
        surname,
        email,
        password,
      });

      if (response.status === 200) {
        setLoading(false);
        window.open(paths.ACTIVATION);
        closePopup();
      }

      if (response.status === 409) {
        setLoading(false);

        addToast('Usuario ya existente.', {
          appearance: 'error',
          autoDismiss: '4000',
        });
      }
    } else {
      return addToast('Las contraseñas deben ser iguales.', {
        appearance: 'warning',
        autoDismiss: '2000',
      });
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
      {loading && <Spinner />}
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
              onChange={updateFormData}
              type='text'
              placeholder='Nombre'
              id='name'
              required
            />

            <label className={classes['register-label']} htmlFor='surname'>
              Apellido
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              onChange={updateFormData}
              type='text'
              placeholder='Apellido'
              id='surname'
              required
            />

            <label className={classes['register-label']} htmlFor='email'>
              Email
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              onChange={updateFormData}
              type='email'
              placeholder='Email'
              id='email'
              required
            />

            <label className={classes['register-label']} htmlFor='password'>
              Contraseña
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input
              className={classes['register-input']}
              onChange={updateFormData}
              type='password'
              placeholder='Contraseña'
              id='password'
              minLength='8'
              required
            />
            <input
              className={classes['register-input']}
              onChange={updateFormData}
              type='password'
              placeholder='Confirmar Contraseña'
              id='confirmPassword'
              minLength='8'
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
