import React from 'react';
import Popup from 'reactjs-popup';
import classes from './Register.module.scss';

const Register = () => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Popup className={classes.content} trigger={<button>Registrarse</button>}
      modal
    >
      {close => (
      <div className={classes.modal}>

        <button className={classes.close} onClick={close}>
          &times;
        </button>

        <div className={classes['register-header']}>
          <p className={classes.tittle}>¡Registrate!</p>
        </div>

        <div className={classes['register-body']}>
          <form className={classes['register-form']}onSubmit={(submitHandler)}>

            <label className={classes['register-label']} htmlFor="name">
              Nombre
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input className={classes['register-input']} type="text" placeholder="Nombre" id="name" required/>

            <label className={classes['register-label']} htmlFor="surname">
              Apellido
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input className={classes['register-input']} type="text" placeholder="Apellido" id="surname" required/>

            <label className={classes['register-label']} htmlFor="email">
              Email
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input className={classes['register-input']} type="email" placeholder="Email" id="email" required/>

            <label className={classes['register-label']} htmlFor="password">
              Contraseña
              <span className={classes['register-required']}> (requerido)</span>
            </label>
            <input className={classes['register-input']} type="password" placeholder="Contraseña" id="password" minLength="8" required/>
            <input className={classes['register-input']} type="password" placeholder="Confirmar Contraseña" id="confmirmPassword" minLength="8" required/>

            <span className={classes['register-question']}>
              ¿Ya tienes cuenta? 
              <a className={classes['link-to-login']} href="(insertar ruta del login)"> Inicia sesión</a>
            </span>

            <button className={classes['register-button']} type="submit">Registrarse</button>
          </form>
        </div>
      </div>
      )}
    </Popup>
  );
}
export default Register;
