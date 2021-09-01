import React from 'react';
import Popup from 'reactjs-popup';
import classes from './Registro.module.scss';
import '../../../node_modules/reactjs-popup/dist/index.css';

const Registro = () => {

  return (
    <Popup trigger={<button className={classes.registroButton}>Registrarse</button>}
      modal
    >
      <div className={classes.modal}>
        <div className={classes.registroHeader}>
          <p>Registrate para continuar</p>
        </div>
        <div className={classes.registroBody}>

          <input type="text" placeholder="Nombre" id="nombre" />

          <input type="text" placeholder="Apellido" id="Apellido" />

          <input type="text" placeholder="Mail" id="Mail" />

          <input type="password" placeholder="Contraseña" id="contrasenia" />

          <button type="submit">Registrarse</button>
        </div>
      </div>
    </Popup>
  );
}
export default Registro;