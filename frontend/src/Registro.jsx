import React from 'react';
import Popup from 'reactjs-popup';
import classes from './Registro.module.scss';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Popup trigger={<button className={classes.registroButton}>Registrarse</button>}
    modal
  >

    <div className={classes.modal}>
      <div className={classes.registroHeader}>Registrate para continuar</div>
      <div className={classes.registroBody}>
        <input className={classes.registroBody} type="text" id="Nombre" />
        <br />
        <input className={classes.registroBody} type="text" id="Apellido" />
        <br />
        <input className={classes.registroBody} type="text" id="Mail" />
        <br />
        <input className={classes.registroBody} type="text" id="contrasenia" />
        <br />
        <input className={classes.registroBody} type="text" id="confirmarCotrasenia" />
        <br />
        <button>Registrarse</button>
      </div>
    </div>
  </Popup>
);