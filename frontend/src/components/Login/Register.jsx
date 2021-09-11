/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import Popup from 'reactjs-popup';
import classes from './Register.module.scss';
import '../../../node_modules/reactjs-popup/dist/index.css';

const Register = () => {

  const submitHandler = () => {
    
  };

  return (
    <Popup trigger={<button className={classes.registerButton}>Registrarse</button>}
      modal
    >
      {close => (
      <div className={classes.modal}>
        <button className={classes.close} onClick={close}>
          &times;
        </button>
        <div className={classes.registerHeader}>
          <p>¡Registrate!</p>
        </div>
        <div className={classes.registerBody}>
          <form onSubmit={(submitHandler)}>
            <label htmlFor="name">Nombre<span> (requerido)</span></label>
            <input type="text" placeholder="Nombre" id="name" required/>

            <label htmlFor="surname">Apellido<span> (requerido)</span></label>
            <input type="text" placeholder="Apellido" id="surname" required/>

            <label htmlFor="email">Email<span> (requerido)</span></label>
            <input type="email" placeholder="Email" id="email" required/>

            <label htmlFor="password">Contraseña<span> (requerido)</span></label>
            <input type="password" placeholder="Contraseña" id="password" minLength="8"/>
            <input type="password" placeholder="Confirmar Contraseña" id="confmirmPassword" minLength="8"/>

            <a href="http://">Ya tienes cuenta? Inicia sesión</a>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
      )}
    </Popup>
  );
}
export default Register;
