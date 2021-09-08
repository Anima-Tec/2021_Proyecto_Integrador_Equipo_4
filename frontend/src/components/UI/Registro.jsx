/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import Popup from 'reactjs-popup';
import classes from './Registro.module.scss';
import '../../../node_modules/reactjs-popup/dist/index.css';

const Registro = () => {

  const handlesubmit = () => {
    e.preventdefault();
  };

  return (
    <Popup trigger={<button className={classes.registerButton}>Registrarse</button>}
      modal
    >
      <div className={classes.modal}>
        <div className={classes.registerHeader}>
          <p>¡Registrate!</p>
        </div>
        <div className={classes.registerBody}>
          <form onSubmit={(handlesubmit)}>
            <input type="text" placeholder="Nombre" id="name"/>

            <input type="text" placeholder="Apellido" id="surname"/>

            <input type="email" placeholder="Mail" id="mail"/>

            <input type="password" placeholder="Contraseña" id="password" minLength="8"/>

            <input type="password" placeholder="Confirmar Contraseña" id="confmirmPassword" minLength="8"/>

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </Popup>
  );
}
export default Registro;
